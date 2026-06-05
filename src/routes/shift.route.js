import { Router } from "express";
import { changeShiftStatus, createShift, deleteShift, getShift, getShifts, updateShift } from "../controllers/shift.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = Router();

router.post("/create", isAdmin, createShift);
router.get("/", isAdmin, getShifts);
router.get("/:id", isAdmin, getShift);
router.put("/update/:id", isAdmin, updateShift);
router.patch('/change-status/id', isAdmin, changeShiftStatus);
router.delete("/delete/:id", isAdmin, deleteShift);

export default router;