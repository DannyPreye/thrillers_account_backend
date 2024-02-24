import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
        select: false

    },
    salt: {
        type: String,
        required: true,
        select: false
    }

});


const User = mongoose.model("User", userSchema);
export default User;
