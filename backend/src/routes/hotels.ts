import express from "express";
import { searchHotel } from "../controllers/hotelsController";

const hotelsRouter = express.Router();

hotelsRouter.get('/search', searchHotel)

export default hotelsRouter;