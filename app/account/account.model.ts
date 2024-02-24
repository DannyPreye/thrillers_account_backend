import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    balance: {
        type: Number,
        default: 1000
    },
    account_number: {
        type: Number,
        required: true,
        unique: true
    },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
