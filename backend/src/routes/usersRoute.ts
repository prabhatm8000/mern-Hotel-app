import express from 'express';
import { check } from 'express-validator';
import { register } from '../controllers/usersController';
import verifyToken from '../middleware/auth';
import { myUserData } from '../controllers/myUserData';

const usersRoute = express.Router();

usersRoute.post("/register", [
    // express validator middleware, {errors will be added to the req}
    check("email", "Email is required").isEmail(),
    check("password", "Password must have 6 characters").isLength({ min: 6 }),
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
], register)

usersRoute.get("/me", verifyToken, myUserData);


export default usersRoute