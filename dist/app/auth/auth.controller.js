"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../user/user.model"));
const password_utils_1 = require("../../utils/password.utils");
const jwt_utils_1 = require("../../utils/jwt.utils");
const account_model_1 = __importDefault(require("../account/account.model"));
const generateAccountNumber_1 = require("../../utils/generateAccountNumber");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const findUser = yield user_model_1.default.findOne({ email: body.email });
                if (findUser) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const { password } = body, rest = __rest(body, ["password"]);
                // encrypt the user password
                const { hash, salt } = (0, password_utils_1.generatePassword)(password);
                const user = new user_model_1.default(Object.assign(Object.assign({}, rest), { hash, salt }));
                yield user.save();
                const account_number = yield (0, generateAccountNumber_1.generateUniqueAccountNumber)();
                // Create an account for the user
                const newAccount = new account_model_1.default({ user: user._id, account_number });
                yield newAccount.save();
                return res.status(201).json({ message: "User created successfully" });
            }
            catch (error) {
                console.log("Registration Error:: ", error);
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // Find user with that email
                const user = yield user_model_1.default.findOne({ email: body.email }).populate(["hash", "salt"]);
                if (!user) {
                    return res.status(400).json({ message: "Incorrect email or password" });
                }
                const { hash, salt, first_name, last_name, email, _id } = user;
                // check to see if the password is valid i.e corresponding with what
                // is on the db
                const isValidPassword = (0, password_utils_1.validatePassword)(body.password, hash, salt);
                if (!isValidPassword) {
                    return res.status(400).json({ message: "Incorrect email or password" });
                }
                const jwt = (0, jwt_utils_1.signJwt)({ _id, first_name, last_name, email });
                return res.status(200).json({
                    message: "Login successful",
                    token: jwt,
                    user: { _id, first_name, last_name, email }
                });
            }
            catch (error) {
                console.log("Registration Error:: ", error);
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
}
exports.default = AuthController;
