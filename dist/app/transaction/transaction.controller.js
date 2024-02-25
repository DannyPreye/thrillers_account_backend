"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = __importDefault(require("../account/account.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
class TransactionController {
    static transferFunds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const user = req.user;
                const { amount, account_number, description } = req.body;
                const amountToNumber = Number(amount);
                const findDebitorAccount = yield account_model_1.default.findOne({ user: user._id });
                const findCreditorAccount = yield account_model_1.default.findOne({ account_number });
                if (!findCreditorAccount) {
                    return res.status(404).json({
                        message: "No user with that account number"
                    });
                }
                if ((findCreditorAccount === null || findCreditorAccount === void 0 ? void 0 : findCreditorAccount.account_number) === (findDebitorAccount === null || findDebitorAccount === void 0 ? void 0 : findDebitorAccount.account_number)) {
                    return res.status(400).json({
                        message: "You cannot transfer to your own account"
                    });
                }
                const CONFIG_FEE = 10;
                const totalDebitAmount = amountToNumber + CONFIG_FEE;
                // @ts-ignore
                if (totalDebitAmount > (findDebitorAccount === null || findDebitorAccount === void 0 ? void 0 : findDebitorAccount.balance)) {
                    return res.status(400).json({
                        message: "Insufficient Fund"
                    });
                }
                //    Get both the balance of the creditor and debitor
                //    @ts-ignore
                const debitorBalance = Number(findDebitorAccount.balance) - totalDebitAmount;
                const creditorBalance = Number(findCreditorAccount.balance) + amountToNumber;
                // save the account balance for both accounts
                // @ts-ignore
                findDebitorAccount.balance = debitorBalance;
                findCreditorAccount.balance = creditorBalance;
                yield findCreditorAccount.save();
                yield (findDebitorAccount === null || findDebitorAccount === void 0 ? void 0 : findDebitorAccount.save());
                // Save the transaction details
                const debitorTransaction = new transaction_model_1.default({
                    user: findDebitorAccount === null || findDebitorAccount === void 0 ? void 0 : findDebitorAccount.user,
                    type: "debit",
                    description: description,
                    amount: totalDebitAmount,
                    account: findDebitorAccount === null || findDebitorAccount === void 0 ? void 0 : findDebitorAccount._id,
                    sender_or_reciever: findCreditorAccount === null || findCreditorAccount === void 0 ? void 0 : findCreditorAccount.user,
                    transaction_fee: CONFIG_FEE
                });
                const creditorTransaction = new transaction_model_1.default({
                    user: findCreditorAccount === null || findCreditorAccount === void 0 ? void 0 : findCreditorAccount.user,
                    type: "credit",
                    description: description,
                    amount: amountToNumber,
                    account: findCreditorAccount === null || findCreditorAccount === void 0 ? void 0 : findCreditorAccount._id,
                    sender_or_reciever: findDebitorAccount === null || findDebitorAccount === void 0 ? void 0 : findDebitorAccount.user
                });
                creditorTransaction.save();
                debitorTransaction.save();
                return res.status(200).json({
                    message: "Transaction successful"
                });
            }
            catch (error) {
                console.log("Transfer Error:: ", error);
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
    static getTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const user = req.user;
                const transactions = yield transaction_model_1.default.find({ user: user._id }).populate("sender_or_reciever", "first_name last_name");
                return res.status(200).json({
                    message: "Transactions",
                    data: transactions
                });
            }
            catch (error) {
                console.log("Get Transactions Error:: ", error);
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
    static getTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transaction_id } = req.params;
                const transaction = yield transaction_model_1.default.findOne({ _id: transaction_id });
                if (!transaction) {
                    return res.status(404).json({
                        message: "Transaction not found"
                    });
                }
                return res.status(200).json({
                    message: "Transaction",
                    data: transaction
                });
            }
            catch (error) {
                console.log("Registration Error:: ", error);
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
}
exports.default = TransactionController;
