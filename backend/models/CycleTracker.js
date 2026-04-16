const mongoose = require('mongoose');

const cycleTrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastPeriodDate: {
    type: Date,
    required: true,
  },
  cycleLength: {
    type: Number,
    default: 28,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CycleTracker', cycleTrackerSchema);
