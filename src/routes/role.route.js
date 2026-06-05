import { Router } from "express";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { isAdmin, isSuperAdmin } from "../middleware/isAdmin.middleware.js";

const router = Router();

router.post("/create", isSuperAdmin, createRole);
router.get("/", isAdmin, getRoles);
router.get("/:id", isAdmin, getRole);
router.put("/update/:id", isSuperAdmin, updateRole);
router.delete("/delete/:id", isSuperAdmin, deleteRole);

export default router;