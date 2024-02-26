import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        return res.status(200).json({ userId: user.id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const signOut = async (req: Request, res: Response) => {
    // auth_token will be override and expires at the time of creation
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.status(200).json({message: 'Signed out Successful'})
};
