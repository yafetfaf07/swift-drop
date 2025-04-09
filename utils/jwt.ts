import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET=process.env.JWT_TOKEN;

export const generateToken = (username:string) => {
    return jwt.sign({username}, JWT_SECRET!,{expiresIn:Math.floor(Date.now() /1000)})
    // return  jwt.sign({usernames:username},JWT_SECRET!,{expiresIn:JWT_EXP})
}

export const verifyToken = (token:string) => {
    try {
        return jwt.verify(token,JWT_SECRET!)
    } catch (error) {
        throw new Error("Invalid token")
    }
}

