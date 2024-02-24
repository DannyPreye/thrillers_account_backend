import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTPayloadType } from "./dto/types";


export const authMiddleWare = (req: Request, res: Response, next: NextFunction) =>
{
    try {
        if (!req.headers.authorization) {

            return res.status(401).json({
                message: "Unauthorized. Token not provided."
            });
        }

        if (!req.headers.authorization.startsWith("Bearer")) {

            return res.status(401).json({
                message: "Unauthorized. Invalid token."
            });
        }
        const authToken = req.headers.authorization.slice(7);




        if (!authToken) {
            return res.status(401).json({
                message: "Unauthorized. Invalid token"
            });
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as unknown as JWTPayloadType;
        // @ts-ignore
        req.user = decoded;
        next();


    } catch (error) {
        console.log("Auth middleware error:: ", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

};
