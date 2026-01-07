// backend/src/routes/authRoutes.js

import express from "express";
import authController from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * Authentication Routes
 */

// @route   POST /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.post("/google", authController.googleLogin);

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get("/verify", authMiddleware, authController.verifyToken);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", authMiddleware, authController.logout);

export default router;
