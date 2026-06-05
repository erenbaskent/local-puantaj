import { Router } from "express";
import { createMonhlySchedules, getMonhlyCalendar } from "../controllers/monthly_schedules.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = Router();

router.post("/create", authenticateToken, isAdmin, createMonhlySchedules);
router.get("/calendar", getMonhlyCalendar);

export default router;