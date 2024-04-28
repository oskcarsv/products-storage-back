import { Router } from "express";
import { check } from "express-validator";
import { createTask, updateTask } from "./task.controller.js";
import { isValidTaskStatus, existUsernameForTask } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { hasRole } from "../middlewares/validate-role.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import {validateIdEmpty} from "../middlewares/validate-task.js";

const router = Router();

router.post(

    "/",
    [
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE"),
        check("taskName", "Task Name is required.").not().isEmpty(),
        check("taskIntegrants", "Task Integrants is required.").not().isEmpty(),
        check("taskIntegrants").custom(existUsernameForTask),
        check("taskStatus").custom(isValidTaskStatus),
        validateFields
    ], createTask

);

router.put(
    "/",
    [
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE"),
        check("taskIntegrants").custom(existUsernameForTask),
        validateIdEmpty
    ], updateTask
);

export default router;