import express from "express";
import TransactionController from "./transaction.controller";
import { authMiddleWare } from "../auth/auth.middleware";
import { validateTransferDTO } from "./dto/transaction.dto";

const transactionRouter = express.Router();

transactionRouter.post("/transfer",
    authMiddleWare,
    validateTransferDTO,
    TransactionController.transferFunds
);

transactionRouter.get("/",
    authMiddleWare,
    TransactionController.getTransactions
);

transactionRouter.get("/:id",
    authMiddleWare,
    TransactionController.getTransaction
);





export default transactionRouter;
