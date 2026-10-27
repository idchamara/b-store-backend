import jwt from "jsonwebtoken";

export default function verifyJWT (req, res, next){
    const reqHeader = req.header("Authorization");
    if (reqHeader != null){
        const token = reqHeader.replace("Bearer ", "");
        jwt.verify(
            token, "random456",(err, decoded)=>{
                if (decoded != null){
                    req.user = decoded;
                }
            }
        );
    }
    next();
}