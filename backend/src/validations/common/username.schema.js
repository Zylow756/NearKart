import { z } from "zod";

export const usernameSchema = z
  .string({
    required_error: "Username is required.",
  })
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(50, "Username cannot exceed 50 characters.");