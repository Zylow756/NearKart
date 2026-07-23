import { Router } from "express";
import {
  sendOTP,
  verifyOTP,
} from "../controllers/otpController.js";
import validate from "../middlewares/validate.js";
import {
  sendOTPSchema,
  verifyOTPSchema,
} from "../validations/otpValidation.js";

const router = Router();

/**
 * Send OTP
 * POST /api/v1/otp/send
 */
router.post(
  "/send",
  validate(sendOTPSchema),
  sendOTP
);

/**
 * Verify OTP
 * POST /api/v1/otp/verify
 */
router.post(
  "/verify",
  validate(verifyOTPSchema),
  verifyOTP
);

export default router;