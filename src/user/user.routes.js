import { Router } from "express";
import { check } from "express-validator";
import { createUser, updateUser, deleteUser} from "./user.controller.js";
import { existenteEmail, esRoleValido, existeUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { hasRolee } from "../middlewares/validar-roles.js";
import { validateJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "Name is required.").not().isEmpty(),
        check("password", "Password must be greater than 6 characters.").isLength({
            min: 6,
        }),
        check("email", "This is not a valid email.").isEmail(),
        check("email").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validateFields,
    ],
    createUser
);

router.put(
    "/:id",
    [
        check("id", "This is not a valid ID.").isMongoId(),
        check("id").custom(existeUserById),
        validateFields,
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validateJWT,
        hasRolee("SUPER_ROLE", "ADMIN_ROLE", "USER_ROLE"),
        check("id", "This is not a valid ROLE.").isMongoId(),
        check("id").custom(existeUserById),
        validateFields,
    ],
    deleteUser
);

export default router;
