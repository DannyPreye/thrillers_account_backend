import express from "express";
import AuthController from "./auth.controller";
import { validateLoginDTO, validateRegDTO } from "./dto/auth.dto";


const authRouter = express.Router();

authRouter.post("/login", validateLoginDTO, AuthController.login);
authRouter.post("/register", validateRegDTO, AuthController.register);


export default authRouter;
