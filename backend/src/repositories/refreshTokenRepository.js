import RefreshToken from "../models/RefreshToken.js";

/**
 * Create a refresh token
 */
export const createRefreshToken = async (tokenData) => {
  return RefreshToken.create(tokenData);
};

/**
 * Find refresh token by ID
 */
export const findRefreshTokenById = async (id) => {
  return RefreshToken.findById(id).populate(
    "user",
    "-__v"
  );
};

/**
 * Find refresh token by user ID
 */
export const findRefreshTokensByUser = async (userId) => {
  return RefreshToken.find({
    user: userId,
    isRevoked: false,
  }).sort({ createdAt: -1 });
};

/**
 * Find refresh token by hashed token
 */
export const findRefreshTokenByToken = async (token) => {
  return RefreshToken.findOne({
    token,
    isRevoked: false,
  }).populate("user");
};

/**
 * Update refresh token
 */
export const updateRefreshToken = async (
  tokenId,
  updateData
) => {
  return RefreshToken.findByIdAndUpdate(
    tokenId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Update last used timestamp
 */
export const updateLastUsed = async (tokenId) => {
  return RefreshToken.findByIdAndUpdate(
    tokenId,
    {
      lastUsedAt: new Date(),
    },
    {
      new: true,
    }
  );
};

/**
 * Revoke a refresh token
 */
export const revokeRefreshToken = async (tokenId) => {
  return RefreshToken.findByIdAndUpdate(
    tokenId,
    {
      isRevoked: true,
      revokedAt: new Date(),
    },
    {
      new: true,
    }
  );
};

/**
 * Revoke all refresh tokens for a user
 */
export const revokeAllRefreshTokens = async (
  userId
) => {
  return RefreshToken.updateMany(
    {
      user: userId,
      isRevoked: false,
    },
    {
      isRevoked: true,
      revokedAt: new Date(),
    }
  );
};

/**
 * Delete refresh token
 */
export const deleteRefreshToken = async (
  tokenId
) => {
  return RefreshToken.findByIdAndDelete(tokenId);
};

/**
 * Delete all refresh tokens of a user
 */
export const deleteUserRefreshTokens = async (
  userId
) => {
  return RefreshToken.deleteMany({
    user: userId,
  });
};

export const findRefreshTokenByJti = async (jti) => {
  return RefreshToken.findOne({
    jti,
    isRevoked: false,
  });
};

/**
 * Delete revoked refresh tokens
 */
export const deleteRevokedTokens = async (
  userId
) => {
  return RefreshToken.deleteMany({
    user: userId,
    isRevoked: true,
  });
};