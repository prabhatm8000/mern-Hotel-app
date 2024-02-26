import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRoute);

app.listen(3000, () => {
    console.log("running at 3000");
});
