const mongoose = require("mongoose");

const cycleNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cycleTrackerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CycleTracker",
      required: true,
    },
    notificationType: {
      type: String,
      enum: [
        "ovulation_approaching",
        "period_7days",
        "period_2days",
        "period_today",
        "period_started",
      ],
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    sent: {
      type: Boolean,
      default: false,
    },
    sentDate: {
      type: Date,
      default: null,
    },
    title: String,
    message: String,
    healthTips: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("CycleNotification", cycleNotificationSchema);
