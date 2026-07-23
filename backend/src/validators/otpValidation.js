import { z } from "zod";
import OTP_PURPOSE from "../constants/otpPurpose.js";

const mobileNumberSchema = z
  .string({
    required_error: "Mobile number is required.",
  })
  .trim()
  .regex(/^[6-9]\d{9}$/, "Invalid mobile number.");

export const sendOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,

    purpose: z.enum(
      Object.values(OTP_PURPOSE),
      {
        errorMap: () => ({
          message: "Invalid OTP purpose.",
        }),
      }
    ),
  }),
});

export const verifyOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,

    purpose: z.enum(
      Object.values(OTP_PURPOSE),
      {
        errorMap: () => ({
          message: "Invalid OTP purpose.",
        }),
      }
    ),

    otp: z
      .string({
        required_error: "OTP is required.",
      })
      .regex(/^\d{6}$/, "OTP must be exactly 6 digits."),
  }),
});