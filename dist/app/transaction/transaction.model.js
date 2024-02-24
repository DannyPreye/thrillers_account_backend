"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["debit", "credit"]
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    account: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    }
}, {
    timestamps: true
});
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
