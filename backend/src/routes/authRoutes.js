import express from "express";

import * as authController from "../controllers/authController.js";

import validate from "../middlewares/validate.js";
import authenticate from "../middlewares/authenticate.js";

import {
  registerRequestSchema,
  registerVerifySchema,
  loginRequestSchema,
  loginVerifySchema,
  refreshTokenSchema,
  logoutSchema,
  logoutAllSchema,
} from "../validations/authValidation.js";

const router = express.Router();

/**
 * Registration
 */
router.post(
  "/register/request-otp",
  validate(registerRequestSchema),
  authController.requestRegisterOTP
);

router.post(
  "/register/verify",
  validate(registerVerifySchema),
  authController.verifyRegisterOTP
);

/**
 * Login
 */
router.post(
  "/login/request-otp",
  validate(loginRequestSchema),
  authController.requestLoginOTP
);

router.post(
  "/login/verify",
  validate(loginVerifySchema),
  authController.verifyLoginOTP
);

/**
 * Refresh Token
 */
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshAccessToken
);

/**
 * Logout Current Device
 */
router.post(
  "/logout",
  validate(logoutSchema),
  authController.logout
);

/**
 * Logout All Devices
 */
router.post(
  "/logout-all",
  authenticate,
  validate(logoutAllSchema),
  authController.logoutAllDevices
);

export default router;