import { Router } from "express";
import { check } from "express-validator";
import { createUser, updateUser, deleteUser} from "./user.controller.js";
import { existentEmail, existentUsername, isValidRole, existUserWithId } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { hasRole } from "../middlewares/validate-role.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    '/',
    [
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE"),
        check("name", "Name is required.").not().isEmpty(),
        check("username", "Username is required").not().isEmpty(),
        check("password", "Password must be greater than 6 characters.").isLength({ min: 6, }),
        check("email", "This is not a valid email.").isEmail(),
        check("email").custom(existentEmail),
        check("username").custom(existentUsername),
        check("role").custom(isValidRole),
        validateFields,
    ],
    createUser
);

router.put(
    "/:id",
    [
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE"),
        check("id", "This is not a valid ID.").isMongoId(),
        check("id").custom(existUserWithId),
        validateFields,
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validateJWT,
        hasRole("SUPER_ROLE"),
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE", "USER_ROLE"),
        check("id", "This is not a valid ROLE.").isMongoId(),
        check("id").custom(existUserWithId),
        validateFields,
    ],
    deleteUser
);

export default router;
