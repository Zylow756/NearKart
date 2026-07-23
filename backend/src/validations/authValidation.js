import { z } from "zod";

import { mobileNumberSchema } from "./common/mobile.schema.js";
import { otpSchema } from "./common/otp.schema.js";
import { usernameSchema } from "./common/username.schema.js";

export const requestRegisterOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
  }),
});

export const verifyRegisterOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
    otp: otpSchema,
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: usernameSchema,
    mobileNumber: mobileNumberSchema,
  }),
});

export const requestLoginOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
  }),
});

export const verifyLoginOTPSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
    otp: otpSchema,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    mobileNumber: mobileNumberSchema,
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z
      .string({
        required_error: "Refresh token is required.",
      })
      .min(1, "Refresh token is required."),
  }),
});

export const logoutSchema = z.object({
  body: z.object({
    refreshToken: z
      .string({
        required_error: "Refresh token is required.",
      })
      .min(1, "Refresh token is required."),
  }),
});

/**
 * Logout All Devices
 */
export const logoutAllSchema = z.object({
  body: z.object({}).strict(),
});