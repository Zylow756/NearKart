import { Router } from "express";
import healthRoutes from "./health.routes.js";
import userRoutes from "./user.routes.js";
import otpRoutes from "./otpRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);
router.use("/otp", otpRoutes);
router.use("/auth", authRoutes);

export default router;