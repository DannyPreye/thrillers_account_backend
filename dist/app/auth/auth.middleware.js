"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleWare = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("Auth middleware error:: ", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
exports.authMiddleWare = authMiddleWare;
