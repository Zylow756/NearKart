import { z } from "zod";
import OTP_PURPOSE from "../constants/otpPurpose.js";
import { mobileNumberSchema } from "./common/mobile.schema.js";
import { otpSchema } from "./common/otp.schema.js";

const mobileNumberSchema = z
  .string({
    required_error: "Mobile number is required.",
  })
  .trim()
  .regex(/^[6-9]\d{9}$/, "Invalid mobile number.");

export const sendOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
    purpose: z.enum(Object.values(OTP_PURPOSE)),
  }),
});

export const verifyOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
    purpose: z.enum(Object.values(OTP_PURPOSE)),
    otp: otpSchema,
  }),
});