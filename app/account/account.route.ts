import express from "express";
import AccountController from "./account.controller";
import { authMiddleWare } from "../auth/auth.middleware";

const accountRouter = express.Router();

accountRouter.get("/", authMiddleWare, AccountController.getUserAccount);

export default accountRouter;
