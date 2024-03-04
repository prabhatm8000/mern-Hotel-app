import express from "express";
import { getHotelById, paymentIntent, searchHotel, addBookings } from "../controllers/hotelsController";
import { param } from "express-validator";
import verifyToken from "../middleware/auth";

const hotelsRouter = express.Router();

hotelsRouter.get("/search", searchHotel);

hotelsRouter.get("/:id", [
    param("id").notEmpty().withMessage("Hotel ID is required")
], getHotelById);

hotelsRouter.post('/:hotelId/bookings/payment-intent', verifyToken, paymentIntent)

hotelsRouter.post("/:hotelId/bookings", verifyToken, addBookings)

export default hotelsRouter;
