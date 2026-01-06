// backend/src/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request object
 * 
 * Usage: Add to routes that require authentication
 * Example: router.get('/protected', authMiddleware, controller)
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.',
      });
    }

    // Get token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in database
    const user = await User.findById(decoded.userId).select('-__v');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Invalid token.',
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated.',
      });
    }

    // Attach user to request object
    req.user = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Log authenticated request
    logger.info(`Authenticated request: ${user.email} - ${req.method} ${req.path}`);

    next();
  } catch (error) {
    logger.error('Authentication error:', error);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication failed.',
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user if token exists, but doesn't fail if missing
 * Useful for routes that work with/without authentication
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-__v');

      if (user && user.isActive) {
        req.user = {
          userId: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    }

    next();
  } catch (error) {
    // Don't fail, just continue without user
    next();
  }
};

/**
 * Role-based Authorization Middleware
 * Checks if authenticated user has required role
 * 
 * @param {Array} roles - Array of allowed roles
 * Usage: router.delete('/admin', authMiddleware, authorize(['admin']), controller)
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions.',
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  optionalAuth,
  authorize,
};