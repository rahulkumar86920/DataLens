// backend/src/middleware/auth.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request object
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Access denied.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-__v");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Invalid token.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account has been deactivated.",
      });
    }

    req.user = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    logger.info(
      `Authenticated request: ${user.email} - ${req.method} ${req.path}`
    );

    next();
  } catch (error) {
    logger.error("Authentication error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

/**
 * Optional Authentication Middleware
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-__v");

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
    next();
  }
};

/**
 * Role-based Authorization Middleware
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions.",
      });
    }

    next();
  };
};

export { authMiddleware, optionalAuth, authorize };
