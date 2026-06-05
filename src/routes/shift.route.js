import { Router } from "express";
import { createShift, deleteShift, getShift, getShifts, updateShift } from "../controllers/shift.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = Router();

router.post("/create", isAdmin, createShift);
router.get("/", isAdmin, getShifts);
router.get("/:id", isAdmin, getShift);
router.put("/update/:id", isAdmin, updateShift);
router.delete("/delete/:id", isAdmin, deleteShift);

export default router;