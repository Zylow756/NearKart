import User from "../models/User.js";

/**
 * Find user by MongoDB ID
 */
const findById = async (id) => {
  return await User.findById(id);
};

/**
 * Find user by mobile number
 */
const findByMobile = async (mobileNumber) => {
  return await User.findOne({ mobileNumber });
};

/**
 * Create new user
 */
const createUser = async (userData) => {
  return await User.create(userData);
};

/**
 * Update user
 */
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Update last login
 */
const updateLastLogin = async (id) => {
  return await User.findByIdAndUpdate(
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