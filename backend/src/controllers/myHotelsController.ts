import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/hotelModel";
import { HotelType } from "../shared/types";

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        // converting image to base64 string
        const base64 = Buffer.from(image.buffer).toString("base64");

        let dataURI = `data:${image.mimetype};base64,${base64}`;

        const res = await cloudinary.v2.uploader.upload(dataURI);

        // returning public url for the uploaded image
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export const addHotel = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // upload images to cloudinary (one by one)
        const imageUrls = await uploadImages(imageFiles);

        // adding URLs to the newHotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // saving date to db
        const hotel = new Hotel(newHotel);
        await hotel.save();

        // 201 -> created
        res.status(201).send(hotel);
    } catch (error) {
        console.log("error creating hotel: ", error);
        res.status(500).json({ message: "Something went worong" });
    }
};

export const getMyHotel = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.status(200).json(hotels);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Error fetching hotels" });
    }
};

export const getMyHotelById = async (req: Request, res: Response) => {
    const id = req.params.hotelId.toString();

    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId,
        });
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error getting hotel" });
    }
};

export const myHotelUpdate = async (req: Request, res: Response) => {
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.hotelId,
                userId: req.userId,
            },
            updatedHotel,
            // so that const hotel will have the latest hotel data
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];

        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const myHotelDelete = async (req: Request, res: Response) => {
    try {
        await Hotel.findByIdAndDelete({
            _id: req.params.hotelId,
            userId: req.userId,
        });

        res.status(200).json({ message: "Hotel deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const myHotelBookings = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;

        // const pageSize = 5;
        // const pageNumber = parseInt(
        //     req.query.page ? req.query.page.toString() : "1"
        // );
        // const skip = (pageNumber - 1) * pageSize;

        const bookings = await Hotel.findById(
            hotelId,
            {
                // bookings: { $slice: ["$bookings", 1] },
                bookings: 1,
                _id: 1,
                name: 1,
            },
            {
            }
        );
        // .skip(skip)
        // .limit(pageSize);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
