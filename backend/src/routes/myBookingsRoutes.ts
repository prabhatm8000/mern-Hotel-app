import express from "express";
import verifyToken from "../middleware/auth";
import { getMyBookings } from "../controllers/myBookingsController";

const myBookingsRoute = express.Router();

myBookingsRoute.get("/", verifyToken, getMyBookings);

export default myBookingsRoute;