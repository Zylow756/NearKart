import * as otpService from "../services/otpService.js";

/**
 * Send OTP
 * POST /api/v1/otp/send
 */
export const sendOTP = async (req, res, next) => {
  try {
    const { mobileNumber, purpose } = req.body;

    if (!mobileNumber || !purpose) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and purpose are required.",
      });
    }

    const result = await otpService.sendOTP(
      mobileNumber,
      purpose
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP
 * POST /api/v1/otp/verify
 */
export const verifyOTP = async (req, res, next) => {
  try {
    const { mobileNumber, purpose, otp } = req.body;

    if (!mobileNumber || !purpose || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile number, purpose and OTP are required.",
      });
    }

    const result = await otpService.verifyOTP(
      mobileNumber,
      purpose,
      otp
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};