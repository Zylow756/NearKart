import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import userService from "../services/userService.js";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const user = await userService.registerUser(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      user
    )
  );
});

// Get User by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "User fetched successfully",
      user
    )
  );
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Users fetched successfully",
      users
    )
  );
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "User updated successfully",
      user
    )
  );
});

// Activate / Deactivate User
const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const user = await userService.updateStatus(
    req.params.id,
    isActive
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "User status updated successfully",
      user
    )
  );
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "User deleted successfully"
    )
  );
});

export {
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  updateUserStatus,
  deleteUser,
};