import { Request, Response } from "express";
import Hotel from "../models/hotelModel";
import { validationResult } from "express-validator";
import Stripe from "stripe";
import { BookingType, PaymentIntentResponse } from "../shared/types";
import User from "../models/userModel";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { state: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        constructedQuery.starRating = {
            $in: Array.isArray(queryParams.stars)
                ? queryParams.stars.map((item: string) => parseInt(item))
                : [parseInt(queryParams.stars)],
        };
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice.toString()),
        };
    }

    return constructedQuery;
};

export const searchHotel = async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );
        const skip = (pageNumber - 1) * pageSize;
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = {
                    starRating: -1,
                };
                break;
            case "pricePerNightAsc":
                sortOptions = {
                    pricePerNight: 1,
                };
                break;
            case "pricePerNightDsc":
                sortOptions = {
                    pricePerNight: -1,
                };
                break;
        }

        const hotels = await Hotel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        const total = await Hotel.countDocuments(query);

        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getHotelById = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ erros: errors.array() });
    }

    const id = req.params.id.toString();

    try {
        const hotel = await Hotel.findById(id);

        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const paymentIntent = async (req: Request, res: Response) => {
    try {
        const hotelId = req.params.hotelId;
        const { numberOfNights } = req.body;

        const user = await User.findById(req.userId);

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ messgae: "Hotel not found" });
        }

        const totalCost =
            hotel.pricePerNight * parseInt(numberOfNights as string);

        const paymentIntent = await stripe.paymentIntents.create({
            // amount will be in lowest unit, so 1rs -> 1 * 100 paise
            amount: totalCost * 100,
            currency: "inr",
            metadata: {
                hotelId,
                userId: req.userId,
            },
            receipt_email: user?.email,
        });

        if (!paymentIntent.client_secret) {
            return res
                .status(500)
                .json({ message: "Error creating payment intent" });
        }

        const response: PaymentIntentResponse = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            totalCost,
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const addBookings = async (req: Request, res: Response) => {
    try {
        const { paymentIntentId } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId as string
        );

        if (!paymentIntent) {
            return res
                .status(400)
                .json({ message: "Payment intent not found" });
        }

        if (
            paymentIntent.metadata.hotelId !== req.params.hotelId ||
            paymentIntent.metadata.userId !== req.userId
        ) {
            return res.status(400).json({ message: "Payment intent mismatch" });
        }

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({
                message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
            });
        }

        const newBooking: BookingType = {
            ...req.body,
            userId: req.userId,
        };

        const hotel = await Hotel.findOneAndUpdate(
            { _id: req.params.hotelId },
            {
                $push: {
                    bookings: newBooking,
                },
            },
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        await hotel.save();
        res.status(200).json({ message: "Booking saved" });
    } catch (error) {
        res.status(500).json({ message: "Someting went wrong" });
    }
};
