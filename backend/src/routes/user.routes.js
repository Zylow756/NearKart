import { Router } from "express";

import {
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  updateUserStatus,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

// Register User
router.post("/register", registerUser);

// Get All Users
router.get("/", getAllUsers);

// Get User By ID
router.get("/:id", getUserById);

// Update User
router.put("/:id", updateUser);

// Activate / Deactivate User
router.patch("/:id/status", updateUserStatus);

// Delete User
router.delete("/:id", deleteUser);

export default router;