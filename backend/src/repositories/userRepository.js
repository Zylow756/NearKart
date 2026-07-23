import User from "../models/User.js";

/**
 * Find user by ID
 */
export const findUserById = async (id) => {
  return User.findById(id);
};

/**
 * Find user by mobile number
 */
export const findUserByMobile = async (mobileNumber) => {
  return User.findOne({ mobileNumber });
};

/**
 * Check if mobile number already exists
 */
export const userExists = async (mobileNumber) => {
  return User.exists({ mobileNumber });
};

/**
 * Create user
 */
export const createUser = async (userData) => {
  return User.create(userData);
};

/**
 * Update user
 */
export const updateUser = async (id, updateData) => {
  return User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Mark mobile as verified
 */
export const verifyUser = async (id) => {
  return User.findByIdAndUpdate(
    id,
    {
      isVerified: true,
    },
    {
      new: true,
    }
  );
};

/**
 * Update last login
 */
export const updateLastLogin = async (id) => {
  return User.findByIdAndUpdate(
    id,
    {
      lastLogin: new Date(),
    },
    {
      new: true,
    }
  );
};

/**
 * Activate / Deactivate user
 */
const updateStatus = async (id, isActive) => {
  return await User.findByIdAndUpdate(
    id,
    {
      isActive,
    },
    {
      new: true,
    }
  );
};

/**
 * Delete user
 */
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

/**
 * Get all users
 */
const findAllUsers = async () => {
  return await User.find().sort({
    createdAt: -1,
  });
};

export default {
  findById,
  findByMobile,
  createUser,
  updateUser,
  updateLastLogin,
  updateStatus,
  deleteUser,
  findAllUsers,
};