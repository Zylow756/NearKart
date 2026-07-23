import OTP_PURPOSE from "../constants/otpPurpose.js";
import * as userRepository from "../repositories/userRepository.js";
import * as otpService from "./otpService.js";
import * as refreshTokenService from "./refreshTokenService.js";
import { generateAccessToken } from "../utils/jwt.js";
import * as otpRepository from "../repositories/otpRepository.js";
import {
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError,
} from "../errors/index.js";

const issueTokens = async (
  user,
  deviceInfo,
  ipAddress
) => {
  const accessToken = generateAccessToken({
    userId: user._id,
    mobileNumber: user.mobileNumber,
    role: user.role,
  });

  const {
    refreshToken
} = await refreshTokenService.createSession(
      user,
      deviceInfo,
      ipAddress
    );

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Send registration OTP
 */
export const requestRegisterOTP = async ({
  username,
  mobileNumber,
}) => {
  const existingUser =
    await userRepository.findUserByMobile(
      mobileNumber
    );

  if (existingUser) {
    throw new ConflictError("Mobile number already registered.");
  }

  await otpService.sendOTP(
    mobileNumber,
    OTP_PURPOSE.REGISTER,
    {
        username
    }
  );

  return {
    success: true,
        message: "OTP sent successfully.",
  };
};

/**
 * Verify registration OTP
 */
export const verifyRegisterOTP = async ({
  mobileNumber,
  otp,
  deviceInfo,
  ipAddress,
}) => {
  await otpService.verifyOTP(
    mobileNumber,
    OTP_PURPOSE.REGISTER,
    otp
  );

  const otpRecord =
    await otpRepository.findVerifiedOTP(
        mobileNumber,
        OTP_PURPOSE.REGISTER
    );

if (!otpRecord) {
    throw new UnauthorizedError(
        "OTP verification failed."
    );
}

const username =
    otpRecord.metadata?.username;

  const user =
    await userRepository.createUser({
    username,
    mobileNumber,
    isVerified: true
    });

  const tokens =
  await issueTokens(
    user,
    deviceInfo,
    ipAddress
  );

return {
  success: true,
  user,
  ...tokens,
};
};

/**
 * Send Login OTP
 */
export const requestLoginOTP = async ({ mobileNumber }) => {
  // Check if user exists
  const user = await userRepository.findUserByMobile(mobileNumber);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  // Check if mobile is verified
  if (!user.isVerified) {
    throw new UnauthorizedError("Mobile number is not verified.");
  }

  // Check if account is active
  if (!user.isActive) {
    throw new ForbiddenError("Account is inactive.");
  }

  // Generate and send OTP
  await otpService.sendOTP(
    mobileNumber,
    OTP_PURPOSE.LOGIN
  );

  return {
    success: true,
    message: "OTP sent successfully.",
  };
};

/**
 * Verify Login OTP
 */
export const verifyLoginOTP = async ({
  mobileNumber,
  otp,
  deviceInfo = null,
  ipAddress = null,
}) => {
  // Verify OTP
  await otpService.verifyOTP(
    mobileNumber,
    OTP_PURPOSE.LOGIN,
    otp
  );

  // Find user
  const user = await userRepository.findUserByMobile(
    mobileNumber
  );

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (!user.isVerified) {
    throw new UnauthorizedError("Mobile number is not verified.");
  }

  if (!user.isActive) {
    throw new Error("Your account has been deactivated.");
  }

  // Update last login
  await userRepository.updateLastLogin(user._id);

  const tokens =
    await issueTokens(
        user,
        deviceInfo,
        ipAddress
    );

return {
    success:true,
    user,
    ...tokens
};
};

/**
 * Refresh Access Token
 */
export const refreshAccessToken = async ({
  refreshToken,
  deviceInfo = null,
  ipAddress = null,
}) => {
  // Validate refresh token and session
  const { session, payload } =
    await refreshTokenService.validateSession(
      refreshToken
    );

  // Find user
  const user = await userRepository.findUserById(
    payload.userId
  );

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (!user.isActive) {
    throw new ForbiddenError("Account is inactive.");
  }

  // Revoke current session (token rotation)
  await refreshTokenService.revokeSession(
    session._id
  );

 const tokens = await issueTokens(
  user,
  deviceInfo,
  ipAddress
);

  return {
    success: true,
     ...tokens
};
};

/**
 * Logout
 */
export const logout = async ({ refreshToken }) => {
  await refreshTokenService.logoutSession(
    refreshToken
  );

  return {
    success: true,
    message: "Logged out successfully.",
  };
};

/**
 * Logout from all devices
 */
export const logoutAllDevices = async ({
  userId,
}) => {
  await refreshTokenService.logoutAllSessions(
    userId
  );

  return {
    success: true,
    message:
      "Logged out from all devices successfully.",
  };
};