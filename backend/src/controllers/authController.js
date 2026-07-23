import * as authService from "../services/authService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * Request Registration OTP
 */
export const requestRegisterOTP = asyncHandler(async (req, res) => {
    const result = await authService.requestRegisterOTP(req.body);

    res.status(200).json(result);
});

/**
 * Verify Registration OTP
 */
export const verifyRegisterOTP = asyncHandler(async (req, res) => {
    const result = await authService.verifyRegisterOTP({
      ...req.body,
       ...req.device,
    });

    res.status(201).json(result);
});

/**
 * Request Login OTP
 */
export const requestLoginOTP = asyncHandler(async (req, res) => {
    const result = await authService.requestLoginOTP(req.body);

    res.status(200).json(result);
});

/**
 * Verify Login OTP
 */
export const verifyLoginOTP = asyncHandler(async (req, res) => {
    const result = await authService.verifyLoginOTP({
      ...req.body,
       ...req.device,
    });

    res.status(200).json(result);
});

/**
 * Refresh Access Token
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const result = await authService.refreshAccessToken({
      refreshToken: req.body.refreshToken,
       ...req.device,
    });

     res.status(200).json(result);
});

/**
 * Logout Current Device
 */
export const logout = asyncHandler(async (req, res) => {
    const result = await authService.logout({
      refreshToken: req.body.refreshToken,
    });

    res.status(200).json(result);
});

/**
 * Logout All Devices
 */
export const logoutAllDevices = asyncHandler(async (req, res) => {
    const result = await authService.logoutAllDevices({
      userId: req.user.userId,
    });

     res.status(200).json(result);
});