import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    deviceInfo: {
      type: String,
      default: null,
    },

    ipAddress: {
      type: String,
      default: null,
    },

    isRevoked: {
      type: Boolean,
      default: false,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    lastUsedAt: {
      type: Date,
      default: null,
    },

    jti: {
  type: String,
  required: true,
  unique: true,
  index: true,
},
  },
  {
    timestamps: true,
  }
);

/**
 * Automatically remove expired refresh tokens
 */
refreshTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;