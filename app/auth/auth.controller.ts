import { Request, Response } from "express";
import User from "../user/user.model";
import { LoginType, RegistrationType } from "./dto/types";
import { generatePassword, validatePassword } from "../../utils/password.utils";
import { signJwt } from "../../utils/jwt.utils";
import Account from "../account/account.model";
import { generateUniqueAccountNumber } from "../../utils/generateAccountNumber";

export default class AuthController
{
    static async register(req: Request, res: Response)
    {
        try {
            const body = req.body as unknown as RegistrationType;

            const findUser = await User.findOne({ email: body.email });

            if (findUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const { password, ...rest } = body;

            // encrypt the user password
            const { hash, salt } = generatePassword(password);

            const user = new User({ ...rest, hash, salt });

            await user.save();

            const account_number = await generateUniqueAccountNumber();

            // Create an account for the user
            const newAccount = new Account({ user: user._id, account_number });
            await newAccount.save();


            return res.status(201).json({ message: "User created successfully" });

        } catch (error) {
            console.log("Registration Error:: ", error);

            res.status(500).json({
                message: "Internal Server Error",

            });
        }
    }
    static async login(req: Request, res: Response)
    {
        try {
            const body = req.body as unknown as LoginType;
            // Find user with that email
            const user = await User.findOne({ email: body.email }).populate([ "hash", "salt" ]);

            if (!user) {
                return res.status(400).json({ message: "Incorrect email or password" });
            }
            const { hash, salt, first_name, last_name, email, _id } = user;

            // check to see if the password is valid i.e corresponding with what
            // is on the db
            const isValidPassword = validatePassword(body.password, hash, salt);

            if (!isValidPassword) {
                return res.status(400).json({ message: "Incorrect email or password" });

            }

            const jwt = signJwt({ _id, first_name, last_name, email });

            return res.status(200).json({
                message: "Login successful",
                token: jwt,
                user: { _id, first_name, last_name, email }
            });

        } catch (error) {
            console.log("Registration Error:: ", error);

            res.status(500).json({
                message: "Internal Server Error",

            });
        }


    }
}
