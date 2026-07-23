import { z } from "zod";

export const otpSchema = z
  .string({
    required_error: "OTP is required.",
  })
  .regex(/^\d{6}$/, "OTP must be exactly 6 digits.");