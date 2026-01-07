// backend/src/controllers/authController.js

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Google OAuth Login Controller
 */
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "ID token is required",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        picture,
        lastLogin: new Date(),
      });

      logger.info(`New user created: ${email}`);
    } else {
      user.lastLogin = new Date();
      await user.save();
      logger.info(`User logged in: ${email}`);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    logger.error("Google login error:", error);

    if (error.message.includes("Token")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Authentication failed. Please try again.",
    });
  }
};

/**
 * Verify JWT Token
 */
const verifyToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    logger.error("Token verification error:", error);
    res.status(500).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

/**
 * Logout Controller
 */
const logout = async (req, res) => {
  try {
    logger.info(`User logged out: ${req.user.email}`);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export default { googleLogin, verifyToken, logout };
