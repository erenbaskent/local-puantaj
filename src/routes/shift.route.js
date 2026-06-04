import { Router } from "express";
import { createShift } from "../controllers/shift.controller.js";

const router = Router();

router.post("/create", createShift);

export default router;