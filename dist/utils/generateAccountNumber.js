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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueAccountNumber = void 0;
const account_model_1 = __importDefault(require("../app/account/account.model"));
// This function is meant to create unique acount number for the user
function generateUniqueAccountNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        let isUnique = false;
        let accountNumber;
        while (!isUnique) {
            accountNumber = Math.floor(1000000000 + Math.random() * 1000000000);
            // Check if the generated account number already exists in the database
            const existingAccount = yield account_model_1.default.findOne({ account_number: accountNumber });
            // If no existing account is found, the generated account number is unique
            if (!existingAccount) {
                isUnique = true;
            }
        }
        return accountNumber;
    });
}
exports.generateUniqueAccountNumber = generateUniqueAccountNumber;
