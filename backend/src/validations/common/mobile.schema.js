import { z } from "zod";

export const mobileNumberSchema = z
  .string({
    required_error: "Mobile number is required.",
  })
  .trim()
  .regex(/^[6-9]\d{9}$/, "Invalid mobile number.");