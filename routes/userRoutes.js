import express from "express";
const router = express.Router();

import {
  authUers,
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from "../controllers/userControllers.js";
import { authenticate, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser()).get(authenticate, admin, getAllUsers());
router.post("/login", authUers());
router
  .route("/profile")
  .get(authenticate, getUserProfile())
  .put(authenticate, updateUserProfile());
router
  .route("/:id")
  .delete(authenticate, admin, deleteUser())
  .get(authenticate, admin, getUserById())
  .put(authenticate, admin, updateUser());

export const userRoute = router;
