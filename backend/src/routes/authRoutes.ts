import express, { Request, Response } from "express";
import { check } from "express-validator";
import { signIn, signOut } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const authRouter = express.Router();

authRouter.post(
    "/sign-in",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password must have 6 characters").isLength({
            min: 6,
        }),
    ],
    signIn
);

authRouter.get(
    "/validate-token",
    verifyToken,
    (req: Request, res: Response) => {
        res.status(200).send({ userId: req.userId });
    }
);

authRouter.post("/sign-out", signOut);

export default authRouter;
