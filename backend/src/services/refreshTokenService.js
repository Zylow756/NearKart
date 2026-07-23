import crypto from "crypto";

import {
  createRefreshToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
  updateLastUsed,
  findRefreshTokenByJti,
} from "../repositories/refreshTokenRepository.js";

import {
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import {
  hashToken,
  compareToken,
} from "../utils/tokenHash.js";

/**
 * Create a refresh token session
 */
export const createSession = async (
  user,
  deviceInfo = null,
  ipAddress = null
) => {
  const jti = crypto.randomUUID();

  const payload = {
    userId: user._id,
    role: user.role,
    jti,
  };

  const refreshToken = generateRefreshToken(payload);

  const hashedToken = await hashToken(refreshToken);

  const decoded = verifyRefreshToken(refreshToken);

  const session = await createRefreshToken({
    user: user._id,
    jti,
    token: hashedToken,
    expiresAt: new Date(decoded.exp * 1000),
    deviceInfo,
    ipAddress,
  });

  return {
    refreshToken,
    session
};
};

/**
 * Verify refresh token
 */
export const validateSession = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  const session = await findRefreshTokenByJti(decoded.jti);

  if (!session) {
    throw new Error("Session not found.");
  }

  if (session.isRevoked) {
    throw new Error("Session revoked.");
  }

  const valid = await compareToken(
    refreshToken,
    session.token
  );

  if (!valid) {
    throw new Error("Invalid refresh token.");
  }

  await updateLastUsed(session._id);

  return {
    session,
    payload: decoded,
  };
};

/**
 * Revoke one session
 */
export const revokeSession = async (sessionId) => {
  return revokeRefreshToken(sessionId);
};

/**
 * Logout from all devices
 */
export const logoutAllSessions = async (userId) => {
  await revokeAllRefreshTokens(userId);
};

/**
 * Logout current session
 */
export const logoutSession = async (refreshToken) => {
  // Validate refresh token and session
  const { session } = await validateSession(refreshToken);

  // Already revoked
  if (session.isRevoked) {
    return;
  }

  // Revoke session
  await revokeSession(session._id);
};