// backend/src/controllers/authController.js

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Google OAuth Login Controller
 * Verifies Google ID token and creates/updates user
 * 
 * @route POST /api/auth/google
 * @access Public
 */
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Validate input
    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'ID token is required',
      });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract user payload from token
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists in database
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        googleId,
        email,
        name,
        picture,
        lastLogin: new Date(),
      });

      logger.info(`New user created: ${email}`);
    } else {
      // Update last login time
      user.lastLogin = new Date();
      await user.save();

      logger.info(`User logged in: ${email}`);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d', // Token expires in 7 days
      }
    );

    // Return success response with token and user data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    logger.error('Google login error:', error);

    // Handle specific errors
    if (error.message.includes('Token')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Google token',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.',
    });
  }
};

/**
 * Verify JWT Token
 * Used to validate user sessions
 * 
 * @route GET /api/auth/verify
 * @access Private
 */
exports.verifyToken = async (req, res) => {
  try {
    // User info is already attached by auth middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    logger.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Token verification failed',
    });
  }
};

/**
 * Logout Controller
 * Invalidates user session (client-side token removal)
 * 
 * @route POST /api/auth/logout
 * @access Private
 */
exports.logout = async (req, res) => {
  try {
    logger.info(`User logged out: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};