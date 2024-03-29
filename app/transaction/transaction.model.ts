import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    transaction_fee: {
        type: Number,
        default: 0

    },
    type: {
        type: String,
        required: true,
        enum: [ "debit", "credit" ]
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    sender_or_reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
