import { Router } from "express";
import { changeUserRole, getOracleUsers, getUser, getUsers } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/aut.middleware.js";

const router = Router();

router.get('/oracle-users',  authenticateToken, getOracleUsers);
router.get('/:id', authenticateToken, getUser);
router.get('/', authenticateToken, getUsers);
router.patch('/:id', changeUserRole);

export default router;