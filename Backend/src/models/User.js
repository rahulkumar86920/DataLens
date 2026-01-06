// backend/src/models/User.js

const mongoose = require('mongoose');

/**
 * User Schema
 * Stores authenticated user information from Google OAuth
 */
const userSchema = new mongoose.Schema(
  {
    // Google unique identifier
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // User email from Google
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    // User full name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Google profile picture URL
    picture: {
      type: String,
      default: '',
    },

    // User role (for future RBAC implementation)
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Last login timestamp
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    // User preferences (extensible for future features)
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'light',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false,
  }
);

// Indexes for performance optimization
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

/**
 * Instance method: Get public user profile
 * Removes sensitive information before sending to client
 */
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    picture: this.picture,
    role: this.role,
    lastLogin: this.lastLogin,
  };
};

/**
 * Static method: Find user by Google ID
 */
userSchema.statics.findByGoogleId = function (googleId) {
  return this.findOne({ googleId, isActive: true });
};

/**
 * Pre-save middleware
 * Logs user creation
 */
userSchema.pre('save', function (next) {
  if (this.isNew) {
    console.log(`New user registered: ${this.email}`);
  }
  next();
});

// Export model
module.exports = mongoose.model('User', userSchema);