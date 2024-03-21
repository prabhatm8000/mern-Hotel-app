import { Request, Response } from "express";
import Hotel from "../models/hotelModel";
import { HotelType } from "../shared/types";

export const getMyBookings = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } },
        });

        const results = hotels.map((item) => {
            const userBookings = item.bookings.filter(
                (booking) => booking.userId === req.userId
            );

            const hotelWithUserBookings: HotelType = {
                ...item.toObject(),
                bookings: userBookings,
            };

            return hotelWithUserBookings;
        });

        res.status(200).json(results.reverse());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
