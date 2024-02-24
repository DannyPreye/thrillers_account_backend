"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginDTO = exports.validateRegDTO = void 0;
const express_validator_1 = require("express-validator");
const validateRegDTO = (req, res, next) => {
    const validationRules = [
        (0, express_validator_1.body)("email")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("email is a required field")
            .isEmail()
            .withMessage("email is invalid"),
        (0, express_validator_1.body)("first_name")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("first_name is a required field"),
        (0, express_validator_1.body)("last_name")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("last_name is a required field"),
        (0, express_validator_1.body)("password")
            .trim()
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(/\d/)
            .withMessage("Password must contain at least one number")
            .matches(/[A-Z]/)
            .withMessage("Password must contain at least one uppercase letter")
            .matches(/[a-z]/)
            .withMessage("Password must contain at least one lowercase letter")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'),
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
exports.validateRegDTO = validateRegDTO;
const validateLoginDTO = (req, res, next) => {
    const validationRules = [
        (0, express_validator_1.body)("email")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("email is a required field")
            .isEmail()
            .withMessage("email is invalid"),
        (0, express_validator_1.body)("password")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("password is a required field"),
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
exports.validateLoginDTO = validateLoginDTO;
