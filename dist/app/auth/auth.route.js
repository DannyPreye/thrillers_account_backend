"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_dto_1 = require("./dto/auth.dto");
const authRouter = express_1.default.Router();
authRouter.post("/login", auth_dto_1.validateLoginDTO, auth_controller_1.default.login);
authRouter.post("/register", auth_dto_1.validateRegDTO, auth_controller_1.default.register);
exports.default = authRouter;
