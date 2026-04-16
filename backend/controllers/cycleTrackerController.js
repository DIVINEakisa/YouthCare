const CycleTracker = require('../models/CycleTracker');

// Calculate cycle predictions
const calculateCyclePredictions = (lastPeriodDate, cycleLength) => {
  const last = new Date(lastPeriodDate);
  const nextPeriod = new Date(last.getTime() + cycleLength * 24 * 60 * 60 * 1000);
  const ovulationDay = new Date(last.getTime() + (cycleLength / 2) * 24 * 60 * 60 * 1000);
  const fertilityStart = new Date(ovulationDay.getTime() - 3 * 24 * 60 * 60 * 1000);
  const fertilityEnd = new Date(ovulationDay.getTime() + 3 * 24 * 60 * 60 * 1000);

  return {
    nextPeriod: nextPeriod.toISOString().split('T')[0],
    ovulationDay: ovulationDay.toISOString().split('T')[0],
    fertilityStart: fertilityStart.toISOString().split('T')[0],
    fertilityEnd: fertilityEnd.toISOString().split('T')[0],
  };
};

// Update cycle tracker
const updateCycleTracker = async (req, res) => {
  try {
    const { lastPeriodDate, cycleLength } = req.body;
    const userId = req.userId;

    let tracker = await CycleTracker.findOne({ userId });

    if (!tracker) {
      tracker = new CycleTracker({
        userId,
        lastPeriodDate,
        cycleLength: cycleLength || 28,
      });
    } else {
      tracker.lastPeriodDate = lastPeriodDate;
      tracker.cycleLength = cycleLength || tracker.cycleLength;
      tracker.updatedAt = new Date();
    }

    await tracker.save();

    const predictions = calculateCyclePredictions(lastPeriodDate, tracker.cycleLength);

    res.json({
      message: 'Cycle tracker updated successfully',
      tracker,
      predictions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get cycle tracker
const getCycleTracker = async (req, res) => {
  try {
    const userId = req.userId;
    const tracker = await CycleTracker.findOne({ userId });

    if (!tracker) {
      return res.json({ message: 'No cycle data found' });
    }

    const predictions = calculateCyclePredictions(tracker.lastPeriodDate, tracker.cycleLength);

    res.json({
      tracker,
      predictions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateCycleTracker,
  getCycleTracker,
};
