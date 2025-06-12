import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");



        if (!token) {
            console.log(`login session expired`);
            return res.json({
                message: "Login session expired",
                success: false,
                user: null

            })

        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decodedToken;


        next();
    } catch (error) {
        throw new ApiError(401, "Invalid access token");
    }
}

export default verifyJWT;
