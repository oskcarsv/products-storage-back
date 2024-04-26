import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";

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

export default router;