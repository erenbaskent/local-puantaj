import { Router } from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import shiftRoutes from "./shift.route.js";
import monthlySchedulesRoutes from "./monhly_schedules.route.js";
import roleRoutes from "./role.route.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/shift", shiftRoutes);
router.use("/monthly-schedules", monthlySchedulesRoutes)
router.use("/roles", roleRoutes);

export default router;