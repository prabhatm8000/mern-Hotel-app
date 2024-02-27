import { Router } from "express";
import multer from "multer";
import { addHotel, getMyHotel } from "../controllers/myHotelsController";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const myHotelsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 5 * 1024 * 1024, // 5MB -> KB
    },
});

myHotelsRouter.post(
    "/",
    verifyToken, // auth is required
    [
        // express validation
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("Price per night is required and must be number"),
        body("facilities")
            .notEmpty()
            .isArray()
            .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6), // accepts 6 images of 5MB
    addHotel
);

myHotelsRouter.get('/', verifyToken, getMyHotel)

export default myHotelsRouter;