import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotelModel";

export const addHotel = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // upload images to cloudinary (one by one)
        const uploadPromises = imageFiles.map(async (image) => {
            // converting image to base64 string
            const base64 = Buffer.from(image.buffer).toString("base64");

            let dataURI = `data:${image.mimetype};base64,${base64}`;

            const res = await cloudinary.v2.uploader.upload(dataURI);

            // returning public url for the uploaded image
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);

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
