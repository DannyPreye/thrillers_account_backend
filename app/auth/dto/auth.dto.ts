import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
export const validateRegDTO = (req: Request, res: Response, next: NextFunction) =>
{
    const validationRules = [
        body("email")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("email is a required field")
            .isEmail()
            .withMessage("email is invalid"),
        body("first_name")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("first_name is a required field"),
        body("last_name")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("last_name is a required field"),
        body("password")
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
            .withMessage(
                'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
            ),
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

export const validateLoginDTO = (req: Request, res: Response, next: NextFunction) =>
{
    const validationRules = [
        body("email")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("email is a required field")
            .isEmail()
            .withMessage("email is invalid"),
        body("password")
            .trim()
            .isString()
            .notEmpty()
            .withMessage("password is a required field"),
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
