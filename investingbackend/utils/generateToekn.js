import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) =>{
    return jwt.sign(
        {
            email:user.email,
            id:user._id,
        },
        process.env.JWTSECRET
    )
}