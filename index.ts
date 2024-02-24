import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";


import authRouter from "./app/auth/auth.route";
import transactionRouter from "./app/transaction/transaction.route";
import accountRouter from "./app/account/account.route";



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());


mongoose.connect(process.env.DATABASE_URI!);

export const db = mongoose.connection;

db.on("error", (error) =>
{
    console.log("Error connecting to database ", error);
    process.exit(1);
});

db.once("open", function ()
{

    console.log("Connected to database");



    // Routes
    app.use("/auth", authRouter);
    app.use("/transaction", transactionRouter);
    app.use("/account", accountRouter);




    app.get("/", (req, res) =>
    {
        res.json("Server is live");
    });



    app.listen(port, () =>
    {
        console.log(`⚡️[server]: Server is running at port ${port}`);
    });


})

