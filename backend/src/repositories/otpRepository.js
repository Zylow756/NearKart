import OTP from "../models/OTP.js";

/**
 * Create a new OTP
 */
export const createOTP = async (otpData) => {
  return OTP.create(otpData);
};

/**
 * Find an OTP by mobile number and purpose
 */
export const findOTP = async (mobileNumber, purpose) => {
  return OTP.findOne({
    mobileNumber,
    purpose,
  });
};

/**
 * Find the latest unverified OTP
 */
export const findLatestActiveOTP = async (mobileNumber, purpose) => {
  return OTP.findOne({
    mobileNumber,
    purpose,
    isVerified: false,
  }).sort({ createdAt: -1 });
};

/**
 * Update an OTP by ID
 */
export const updateOTP = async (otpId, updateData) => {
  return OTP.findByIdAndUpdate(otpId, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete an OTP by ID
 */
export const deleteOTP = async (otpId) => {
  return OTP.findByIdAndDelete(otpId);
};

/**
 * Delete all OTPs for a mobile number and purpose
 */
export const deleteOTPs = async (mobileNumber, purpose) => {
  return OTP.deleteMany({
    mobileNumber,
    purpose,
  });
};

/**
 * Increment verification attempts
 */
export const incrementAttempts = async (otpId) => {
  return OTP.findByIdAndUpdate(
    otpId,
    {
      $inc: {
        attempts: 1,
      },
    },
    {
      new: true,
    }
  );
};

/**
 * Mark an OTP as verified
 */
export const markAsVerified = async (otpId) => {
  return OTP.findByIdAndUpdate(
    otpId,
    {
      isVerified: true,
      verifiedAt: new Date(),
    },
    {
      new: true,
    }
  );
};