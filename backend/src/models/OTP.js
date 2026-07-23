import mongoose from "mongoose";
import OTP_PURPOSE from "../constants/otpPurpose.js";

const otpSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
    },

    purpose: {
      type: String,
      enum: Object.values(OTP_PURPOSE),
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resendCount: {
      type: Number,
      default: 0,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Automatically delete expired OTP documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Prevent multiple active OTPs for the same mobile number and purpose
otpSchema.index({
  mobileNumber: 1,
  purpose: 1,
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
