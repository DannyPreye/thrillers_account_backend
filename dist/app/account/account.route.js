"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = __importDefault(require("./account.controller"));
const auth_middleware_1 = require("../auth/auth.middleware");
const accountRouter = express_1.default.Router();
accountRouter.get("/", auth_middleware_1.authMiddleWare, account_controller_1.default.getUserAccount);
exports.default = accountRouter;
