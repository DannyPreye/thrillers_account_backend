import { Request, Response } from "express";
import Account from "./account.model";

export default class AccountController
{
    static async getUserAccount(req: Request, res: Response)
    {
        try {
            // @ts-ignore
            const user = req.user;

            const account = await Account.findOne({ user: user._id });

            res.status(200).json({

                data: account
            });

        } catch (error) {
            console.log("Account Details Error", error);
            res.status(500).json({
                message: "Internal server error"
            });

        }
    }
}
