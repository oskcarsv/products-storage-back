import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existentEmail, existentUsername } from "../helpers/db-validator.js";
import { validationPassword } from "../helpers/data-validator.js";

const router = Router();

router.post(
    '/login',
    [
        check('usernameOrEmail', "It's obligatory a username or a email").not().isEmpty(),
        check('password', 'Password is obligatory').not().isEmpty(),
        validateFields,
    ],
    login
);

router.post(
    "/register",
    [
        check("name", "Name is required.").not().isEmpty(),
        check("username", "username is required").not().isEmpty(),
        check("username").custom(existentUsername),
        check("password", "Password must be greater than 6 characters.").isLength({
            min: 6,
        }),
        check("password").custom(validationPassword),
        check("email", "This is not a valid email.").isEmail(),
        check("email").custom(existentEmail),
        validateFields,
    ],
    register
);

export default router;