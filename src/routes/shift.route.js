import { Router } from "express";
import { createShift, deleteShift, getShift, getShifts, updateShift } from "../controllers/shift.controller.js";

const router = Router();

router.post("/create", createShift);
router.get("/", getShifts);
router.get("/:id", getShift);
router.put("/update/:id", updateShift);
router.delete("/delete/:id", deleteShift);

export default router;