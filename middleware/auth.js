import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export default function verifyJWT (req, res, next){
    const reqHeader = req.header("Authorization");
    if (reqHeader != null){
        const token = reqHeader.replace("Bearer ", "");
        jwt.verify(
            token, process.env.JWT_KEY,(err, decoded)=>{
                if (decoded != null){
                    req.user = decoded;
                }
            }
        );
    }
    next();
}