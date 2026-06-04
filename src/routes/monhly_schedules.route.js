import { Router } from "express";
import { createMonhlySchedules, getMonhlyCalendar } from "../controllers/monthly_schedules.controller.js";

const router = Router();

router.post("/create", createMonhlySchedules);
router.get("/calendar", getMonhlyCalendar);

export default router;