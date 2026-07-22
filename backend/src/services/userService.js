import userRepository from "../repositories/userRepository.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get user by mobile number
 */
const findUserByMobile = async (mobileNumber) => {
  return await userRepository.findByMobile(mobileNumber);
};

/**
 * Get user by ID
 */
const findUserById = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

/**
 * Register new user
 */
const registerUser = async (userData) => {
  const existingUser = await userRepository.findByMobile(
    userData.mobileNumber
  );

  if (existingUser) {
    throw new ApiError(
      409,
      "Mobile number is already registered"
    );
  }

  return await userRepository.createUser(userData);
};

/**
 * Update user profile
 */
const updateUser = async (id, updateData) => {
  const user = await findUserById(id);

  return await userRepository.updateUser(
    user._id,
    updateData
  );
};

/**
 * Update last login
 */
const updateLastLogin = async (id) => {
  return await userRepository.updateLastLogin(id);
};

/**
 * Activate / Deactivate user
 */
const updateStatus = async (id, isActive) => {
  return await userRepository.updateStatus(
    id,
    isActive
  );
};

/**
 * Get all users
 */
const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

/**
 * Delete user
 */
const deleteUser = async (id) => {
  await findUserById(id);

  return await userRepository.deleteUser(id);
};

export default {
  findUserByMobile,
  findUserById,
  registerUser,
  updateUser,
  updateLastLogin,
  updateStatus,
  getAllUsers,
  deleteUser,
};