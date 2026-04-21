const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["reproductive", "mental", "youth", "nutrition", "safety"],
      required: true,
    },
    title: {
      en: {
        type: String,
        required: true,
      },
      rw: {
        type: String,
        required: true,
      },
    },
    description: {
      en: {
        type: String,
        required: true,
      },
      rw: {
        type: String,
        required: true,
      },
    },
    content: {
      en: {
        type: String,
        required: true,
      },
      rw: {
        type: String,
        required: true,
      },
    },
    icon: {
      type: String,
      default: "📚",
    },
    type: {
      type: String,
      enum: ["article", "video", "resource"],
      default: "article",
    },
    videoUrl: {
      type: String,
      default: null,
    },
    targetAudience: {
      type: [String],
      enum: ["all", "female", "male"],
      default: ["all"],
    },
    ageGroup: {
      type: String,
      enum: ["10-13", "13-16", "16-19", "all"],
      default: "all",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    source: {
      type: String,
      default: "YouthCare+",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Education", educationSchema);
