import { Request, Response } from "express";
import { JWTPayloadType } from "../auth/dto/types";
import Account from "../account/account.model";
import Transaction from "./transaction.model";

export default class TransactionController
{
    static async transferFunds(req: Request, res: Response)
    {
        try {
            // @ts-ignore
            const user = req.user as unknown as JWTPayloadType;

            const { amount, account_number, transaction_description } = req.body;

            const findDebitorAccount = await Account.findOne({ user: user._id });

            const findCreditorAccount = await Account.findOne({ account_number });

            if (!findCreditorAccount) {
                return res.status(404).json({
                    message: "No user with that account number"
                });
            }

            if (findCreditorAccount?.account_number === findDebitorAccount?.account_number) {
                return res.status(400).json({
                    message: "You cannot transfer to your own account"
                });
            }
            const CONFIG_FEE = 10;

            // @ts-ignore
            if (findDebitorAccount.balance < amount + CONFIG_FEE) {
                return res.status(400).json({
                    message: "Insufficient Fund"
                });
            }



            //    Get both the balance of
            //    @ts-ignore
            const debitorBalance = findDebitorAccount.balance - (amount + CONFIG_FEE);
            const creditorBalance = findCreditorAccount.balance + amount;



            // save the account balance for both accounts
            // @ts-ignore
            findDebitorAccount.balance = debitorBalance;
            findCreditorAccount.balance = creditorBalance;


            await findCreditorAccount.save();
            await findDebitorAccount?.save();


            // Save the transaction details
            const debitorTransaction = new Transaction({
                user: findDebitorAccount?._id,
                type: "debit",
                description: transaction_description,
                amount: amount + CONFIG_FEE,
                account: findDebitorAccount?._id
            });


            const creditorTransaction = new Transaction({
                user: findCreditorAccount?._id,
                type: "credit",
                description: transaction_description,
                amount: amount,
                account: findCreditorAccount?._id

            });

            creditorTransaction.save();
            debitorTransaction.save();

            return res.status(200).json({
                message: "Transaction successful"
            });


        } catch (error) {
            console.log("Transfer Error:: ", error);

            res.status(500).json({
                message: "Internal Server Error",

            });

        }



    }

    static async getTransactions(req: Request, res: Response)
    {
        try {
            // @ts-ignore
            const user = req.user as unknown as JWTPayloadType;

            const transactions = await Transaction.find({ user: user._id });

            return res.status(200).json({
                message: "Transactions",
                data: transactions
            });
        } catch (error) {
            console.log("Get Transactions Error:: ", error);

            res.status(500).json({
                message: "Internal Server Error",

            });
        }
    }

    static async getTransaction(req: Request, res: Response)
    {
        try {

            const { transaction_id } = req.params;

            const transaction = await Transaction.findOne({ _id: transaction_id });

            if (!transaction) {
                return res.status(404).json({
                    message: "Transaction not found"
                });
            }
            return res.status(200).json({
                message: "Transaction",
                data: transaction
            });
        } catch (error) {
            console.log("Registration Error:: ", error);

            res.status(500).json({
                message: "Internal Server Error",

            });
        }

    }
}
