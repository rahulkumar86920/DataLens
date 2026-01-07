// backend/src/models/ScrapedItem.js

import mongoose from "mongoose";

/**
 * Scraped Item Schema
 * Stores data scraped from Hacker News
 */
const scrapedItemSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
      min: 1,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    link: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },

    points: {
      type: Number,
      default: 0,
      min: 0,
    },

    comments: {
      type: Number,
      default: 0,
      min: 0,
    },

    scrapedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    domain: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: ["hackernews", "other"],
      default: "hackernews",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
scrapedItemSchema.index({ rank: 1 });
scrapedItemSchema.index({ scrapedAt: -1 });
scrapedItemSchema.index({ points: -1 });

// Pre-save: extract domain
scrapedItemSchema.pre("save", function (next) {
  if (this.link) {
    try {
      const url = new URL(this.link);
      this.domain = url.hostname.replace("www.", "");
    } catch (error) {
      console.error("Error extracting domain:", error);
    }
  }
  next();
});

// Virtual: time since scraped
scrapedItemSchema.virtual("timeSinceScraped").get(function () {
  const now = new Date();
  const diff = now - this.scrapedAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
});

// Static: top stories
scrapedItemSchema.statics.getTopStories = function (limit = 10) {
  return this.find().sort({ points: -1 }).limit(limit).select("-__v");
};

// Static: clean old data
scrapedItemSchema.statics.cleanOldData = async function () {
  const latestScrape = await this.findOne().sort({ scrapedAt: -1 });

  if (latestScrape) {
    const cutoffDate = latestScrape.scrapedAt;
    const result = await this.deleteMany({ scrapedAt: { $lt: cutoffDate } });
    return result.deletedCount;
  }

  return 0;
};

// Instance method
scrapedItemSchema.methods.toClient = function () {
  return {
    id: this._id,
    rank: this.rank,
    title: this.title,
    link: this.link,
    domain: this.domain,
    points: this.points,
    comments: this.comments,
    scrapedAt: this.scrapedAt,
    timeSinceScraped: this.timeSinceScraped,
  };
};

export default mongoose.model("ScrapedItem", scrapedItemSchema);
