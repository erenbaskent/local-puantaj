import { Router } from "express";
import { createRole, deleteRole, getRoles, updateRole } from "../controllers/role.controller.js";

const router = Router();

router.post("/create", createRole);
router.get("/", getRoles);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

export default router;