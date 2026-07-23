import {
  createOTP,
  deleteOTPs,
  findLatestActiveOTP,
  incrementAttempts,
  markAsVerified,
} from "../repositories/otpRepository.js";

import { generateOTP } from "../utils/otpGenerator.js";
import { hashOTP, compareOTP } from "../utils/otpHash.js";

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;

/**
 * Generate and store a new OTP
 */
export const sendOTP = async (mobileNumber, purpose) => {
  // Remove any previous OTPs for the same purpose
  await deleteOTPs(mobileNumber, purpose);

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP
  const hashedOTP = await hashOTP(otp);

  // Expiry time
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  // Save OTP
  await createOTP({
    mobileNumber,
    otp: hashedOTP,
    purpose,
    expiresAt,
  });

  // TODO:
  // Send OTP via SMS provider here

  return {
    success: true,
    otp, // Return only during development. Remove in production.
  };
};

/**
 * Verify OTP
 */
export const verifyOTP = async (
  mobileNumber,
  purpose,
  enteredOTP
) => {
  const otpRecord = await findLatestActiveOTP(
    mobileNumber,
    purpose
  );

  if (!otpRecord) {
    throw new Error("OTP not found.");
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new Error("OTP has expired.");
  }

  if (otpRecord.attempts >= MAX_ATTEMPTS) {
    throw new Error("Maximum OTP attempts exceeded.");
  }

  const isMatch = await compareOTP(
    enteredOTP,
    otpRecord.otp
  );

  if (!isMatch) {
    await incrementAttempts(otpRecord._id);
    throw new Error("Invalid OTP.");
  }

  await markAsVerified(otpRecord._id);

  return {
    success: true,
    message: "OTP verified successfully.",
  };
};