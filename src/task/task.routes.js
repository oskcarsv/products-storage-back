import { Router } from "express";
import { check } from "express-validator";
import { createTask, updateTask, deleteTask, listTasks } from "./task.controller.js";
import { isValidTaskStatus, existUsernameForTask, existTaskWithId } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { hasRole } from "../middlewares/validate-role.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import {validateIdEmpty} from "../middlewares/validate-task.js";

const router = Router();

router.get("/", listTasks);

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
        check("taskId").custom(existTaskWithId),
        check("taskIntegrants").custom(existUsernameForTask),
        check("taskStatus").custom(isValidTaskStatus),
        validateFields
    ], updateTask
);

router.delete(
    "/",
    [
        validateJWT,
        hasRole("SUPER_ROLE", "ADMIN_ROLE"),
        check("taskId").custom(existTaskWithId),
        validateIdEmpty,
        validateFields,
    ],deleteTask
);

export default router;