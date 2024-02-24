import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateTransferDTO = (req: Request, res: Response, next: NextFunction) =>
{
    const validationRules = [
        body("amount")
            .trim()
            .isNumeric()
            .withMessage("amount must be a number")
            .isLength({ min: 1 })
            .withMessage("amount is a required field"),
        body("description")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("description is a required field"),
        body("account_number")
            .trim()
            .isNumeric()
            .withMessage("account_number must be a number")
            .isLength({ min: 10, max: 10 })
            .withMessage("account_number must be 10 digits")
            .notEmpty()
            .withMessage("account_number is a required field"),
    ];

    Promise.all(validationRules.map((validation) => validation.run(req))).then(
        () =>
        {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "missing or incorrect field format",
                    errors: errors.array(),
                });
            }

            next();
        }
    );
};
