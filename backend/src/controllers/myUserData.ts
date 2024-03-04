import { Request, Response } from "express";
import User from "../models/userModel";

export const myUserData = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const me = await User.findById(userId).select("-password"); // this will not include password
        if (!me) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(me);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
