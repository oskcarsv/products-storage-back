import { Router } from "express";
import { check } from "express-validator";
import { createTask, updateTask, deleteTask, listTask, listTaskByUser } from "./task.controller.js";
import { isValidTaskStatus, existUsernameForTask, existTaskWithId, isAdminOrSuperRole } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { hasRole } from "../middlewares/validate-role.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateIdEmpty } from "../middlewares/validate-task.js";
import { is } from "date-fns/locale";

const router = Router();

router.get("/", listTask);

router.get(
    "/listTaskByUser",
    [
        validateJWT
    ], listTaskByUser
);


router.post(
    "/",
    [
        validateJWT,
        check("taskName", "Task Name is required.").not().isEmpty(),
        isAdminOrSuperRole,
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
    ], deleteTask
);

export default router;