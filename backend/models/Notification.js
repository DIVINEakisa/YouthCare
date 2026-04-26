const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["cycle", "health-tip", "reminder", "alert", "recommendation"],
      default: "reminder",
    },
    icon: {
      type: String,
      default: "🔔",
    },
    read: {
      type: Boolean,
      default: false,
    },
    actionUrl: {
      type: String,
      default: null,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Education",
      default: null,
    },
    relatedData: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", notificationSchema);
