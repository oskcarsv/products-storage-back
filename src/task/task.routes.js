import { Router } from "express";
import { check } from "express-validator";
import { createTask } from "./task.controller.js";
import { isValidTaskStatus } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { hasRole } from "../middlewares/validate-role.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(

    "/",
    [
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE"),
        check("taskName", "Task Name is required.").not().isEmpty(),
        check("taskIntegrants", "Task Integrants is required.").not().isEmpty(),
        check("taskStatus").custom(isValidTaskStatus),
        validateFields
    ], createTask

);

export default router;