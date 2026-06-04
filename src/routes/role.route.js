import { Router } from "express";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/role.controller.js";

const router = Router();

router.post("/create", createRole);
router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

export default router;