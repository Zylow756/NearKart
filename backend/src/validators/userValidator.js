import { z } from "zod";

export const mobileSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/),
});