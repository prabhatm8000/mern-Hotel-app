import express from 'express';
import { check } from 'express-validator';
import { register } from '../controllers/usersController';

const usersRoute = express.Router();

usersRoute.post("/register", [
    // express validator middleware, {errors will be added to the req}
    check("email", "Email is required").isEmail(),
    check("password", "Password must have 6 characters").isLength({ min: 6 }),
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
], register)



export default usersRoute