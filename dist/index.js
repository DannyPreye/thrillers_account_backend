"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./app/auth/auth.route"));
const transaction_route_1 = __importDefault(require("./app/transaction/transaction.route"));
const account_route_1 = __importDefault(require("./app/account/account.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
mongoose_1.default.connect(process.env.DATABASE_URI);
exports.db = mongoose_1.default.connection;
exports.db.on("error", (error) => {
    console.log("Error connecting to database ", error);
    process.exit(1);
});
exports.db.once("open", function () {
    console.log("Connected to database");
    // Routes
    app.use("/auth", auth_route_1.default);
    app.use("/transaction", transaction_route_1.default);
    app.use("/account", account_route_1.default);
    app.get("/", (req, res) => {
        res.json("Server is live");
    });
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at port ${port}`);
    });
});
