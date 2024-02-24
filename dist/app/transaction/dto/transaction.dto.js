"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransferDTO = void 0;
const express_validator_1 = require("express-validator");
const validateTransferDTO = (req, res, next) => {
    const validationRules = [
        (0, express_validator_1.body)("amount")
            .trim()
            .isNumeric()
            .withMessage("amount must be a number")
            .isLength({ min: 1 })
            .withMessage("amount is a required field"),
        (0, express_validator_1.body)("description")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("description is a required field"),
        (0, express_validator_1.body)("account_number")
            .trim()
            .isNumeric()
            .withMessage("account_number must be a number")
            .isLength({ min: 10, max: 10 })
            .withMessage("account_number must be 10 digits")
            .notEmpty()
            .withMessage("account_number is a required field"),
    ];
    Promise.all(validationRules.map((validation) => validation.run(req))).then(() => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "missing or incorrect field format",
                errors: errors.array(),
            });
        }
        next();
    });
};
exports.validateTransferDTO = validateTransferDTO;
