"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.generatePassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generatePassword(password) {
    // This function is meant to generate salt and hash to encrypt the user password
    let salt = crypto_1.default.randomBytes(32).toString('hex');
    let hash = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: hash
    };
}
exports.generatePassword = generatePassword;
function validatePassword(password, hash, salt) {
    // This function is used to verify the user password using the salt and hash on the user model
    const hashVerify = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
exports.validatePassword = validatePassword;
