"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = __importDefault(require("./transaction.controller"));
const auth_middleware_1 = require("../auth/auth.middleware");
const transaction_dto_1 = require("./dto/transaction.dto");
const transactionRouter = express_1.default.Router();
transactionRouter.post("/transfer", auth_middleware_1.authMiddleWare, transaction_dto_1.validateTransferDTO, transaction_controller_1.default.transferFunds);
transactionRouter.get("/", auth_middleware_1.authMiddleWare, transaction_controller_1.default.getTransactions);
transactionRouter.get("/:id", auth_middleware_1.authMiddleWare, transaction_controller_1.default.getTransaction);
exports.default = transactionRouter;
