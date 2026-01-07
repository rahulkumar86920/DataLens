// backend/src/models/User.js

import mongoose from "mongoose";

/**
 * User Schema
 * Stores authenticated user information from Google OAuth
 */
const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

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

    name: {
      type: String,
      required: true,
      trim: true,
    },

    picture: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Instance method
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

// Static method
userSchema.statics.findByGoogleId = function (googleId) {
  return this.findOne({ googleId, isActive: true });
};

// Pre-save middleware
userSchema.pre("save", function (next) {
  if (this.isNew) {
    console.log(`New user registered: ${this.email}`);
  }
  next();
});

// Export model
export default mongoose.model("User", userSchema);
