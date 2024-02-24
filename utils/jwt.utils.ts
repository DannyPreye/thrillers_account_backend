import jwt from "jsonwebtoken";
import { JWTPayloadType } from "../app/auth/dto/types";

export const signJwt = (payload: JWTPayloadType) =>
{
    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return token;
};
