import mongoose from "mongoose";

export type RegistrationType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;

};

export type LoginType = {
    email: string;
    password: string;
};


export type JWTPayloadType = {
    _id: mongoose.Types.ObjectId;
    email: string;
    first_name: string;
    last_name: string;

};
