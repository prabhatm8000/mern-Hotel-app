import express from "express";
import { getHotelById, searchHotel } from "../controllers/hotelsController";
import { param } from "express-validator";

const hotelsRouter = express.Router();

hotelsRouter.get("/search", searchHotel);

hotelsRouter.get("/:id", [
    param("id").notEmpty().withMessage("Hotel ID is required")
], getHotelById);

export default hotelsRouter;
