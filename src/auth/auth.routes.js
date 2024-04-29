import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existentEmail } from "../helpers/db-validator.js";

const router = Router();

router.post(
    '/login',
    [
        check('email', 'This is not a valid Email').isEmail(),
        check('password', 'Is Obligatory the password').not().isEmpty(),
        validateFields,
    ],
    login
);

router.post(
    "/register",
    [
        check("name", "Name is required.").not().isEmpty(),
        check("username", "username is required").not().isEmpty(),
        check("password", "Password must be greater than 6 characters.").isLength({
            min: 6,
        }),
        check("email", "This is not a valid email.").isEmail(),
        check("email").custom(existentEmail),
        validateFields,
    ],
    register
);

export default router;