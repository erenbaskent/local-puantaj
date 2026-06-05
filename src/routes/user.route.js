import { Router } from "express";
import { changeUserRole, getOracleUsers, getUser, getUsers } from "../controllers/user.controller.js";
import { isAdmin, isSuperAdmin } from "../middleware/isAdmin.middleware.js";

const router = Router();

router.get('/oracle-users', isAdmin, getOracleUsers);
router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/change-role/:id', isSuperAdmin, changeUserRole);
router.patch('/change-status/id', isSuperAdmin);

export default router;