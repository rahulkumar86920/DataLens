// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

/**
 * Authentication Routes
 */

// @route   POST /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.post('/google', authController.googleLogin);

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', authMiddleware, authController.verifyToken);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;


