import { Router } from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import shiftRoutes from "./shift.route.js";
import monthlySchedulesRoutes from "./monhly_schedules.route.js";
import roleRoutes from "./role.route.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/users", authenticateToken, userRoutes);
router.use("/auth", authRoutes);
router.use("/shift", authenticateToken, shiftRoutes);
router.use("/monthly-schedules", authenticateToken, monthlySchedulesRoutes)
router.use("/roles", authenticateToken, roleRoutes);

export default router;