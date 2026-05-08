import { Router } from "express";
import { getOracleUsers, getUser, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.get('/oracle-users', getOracleUsers);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;