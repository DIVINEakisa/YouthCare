const CycleTracker = require('../models/CycleTracker');
const CycleNotification = require('../models/CycleNotification');
const Notification = require('../models/Notification');

// Calculate cycle predictions
const calculateCyclePredictions = (lastPeriodDate, cycleLength) => {
  const last = new Date(lastPeriodDate);
  const nextPeriod = new Date(last.getTime() + cycleLength * 24 * 60 * 60 * 1000);
  const ovulationDay = new Date(last.getTime() + (cycleLength / 2) * 24 * 60 * 60 * 1000);
  const fertilityStart = new Date(ovulationDay.getTime() - 5 * 24 * 60 * 60 * 1000);
  const fertilityEnd = new Date(ovulationDay.getTime() + 1 * 24 * 60 * 60 * 1000);

  return {
    nextPeriod: nextPeriod.toISOString().split('T')[0],
    ovulationDay: ovulationDay.toISOString().split('T')[0],
    fertilityStart: fertilityStart.toISOString().split('T')[0],
    fertilityEnd: fertilityEnd.toISOString().split('T')[0],
  };
};

// Generate health tips for cycle
const getHealthTips = (phase) => {
  const tips = {
    ovulation: [
      "Stay hydrated - drink plenty of water",
      "Eat energy-rich foods",
      "Regular exercise can help manage energy",
      "Get adequate sleep",
    ],
    before_period: [
      "Drink warm water with ginger to ease cramps",
      "Eat iron-rich foods (spinach, beans, meat)",
      "Take calcium and magnesium supplements",
      "Use warm compress for pain relief",
      "Rest when needed - listen to your body",
    ],
    period: [
      "Stay well-hydrated",
      "Eat nutrient-dense foods",
      "Light exercise like walking can help",
      "Use pain relief methods (heat, rest)",
      "Track your symptoms in the app",
    ],
  };

  return tips[phase] || [];
};

// Create automatic cycle notifications
const createCycleNotifications = async (userId, trackerId, predictions) => {
  try {
    // Get dates as Date objects
    const nextPeriodDate = new Date(predictions.nextPeriod);
    const ovulationDate = new Date(predictions.ovulationDay);

    // 7 days before period
    const sevenDaysBefore = new Date(nextPeriodDate);
    sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);

    // 2 days before period
    const twoDaysBefore = new Date(nextPeriodDate);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);

    // Create notifications
    const notifications = [
      {
        notificationType: 'period_7days',
        scheduledDate: sevenDaysBefore,
        title: 'Period Coming Soon',
        message: 'Your period is expected in 7 days. Prepare yourself with healthy nutrition and self-care.',
        healthTips: getHealthTips('before_period'),
      },
      {
        notificationType: 'period_2days',
        scheduledDate: twoDaysBefore,
        title: 'Period in 2 Days',
        message: 'Your period is coming in 2 days. Ensure you have sanitary products and take care of yourself.',
        healthTips: getHealthTips('before_period'),
      },
      {
        notificationType: 'ovulation_approaching',
        scheduledDate: ovulationDate,
        title: 'Ovulation Today',
        message: 'Today is your ovulation day. Fertility is at its peak. Take care of your health.',
        healthTips: getHealthTips('ovulation'),
      },
    ];

    // Delete old notifications for this cycle
    await CycleNotification.deleteMany({ 
      userId, 
      cycleTrackerId: trackerId 
    });

    // Create new notifications
    for (const notif of notifications) {
      const cycleNotif = new CycleNotification({
        userId,
        cycleTrackerId: trackerId,
        notificationType: notif.notificationType,
        scheduledDate: notif.scheduledDate,
        title: notif.title,
        message: notif.message,
        healthTips: notif.healthTips,
      });

      await cycleNotif.save();

      // Create in-app notification
      const appNotif = new Notification({
        userId,
        title: notif.title,
        message: notif.message,
        type: 'cycle',
        icon: '🌸',
        relatedData: {
          healthTips: notif.healthTips,
          scheduledDate: notif.scheduledDate,
        },
      });

      await appNotif.save();
    }

    return true;
  } catch (error) {
    console.error('Error creating cycle notifications:', error);
    return false;
  }
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

    // Create automatic notifications
    await createCycleNotifications(userId, tracker._id, predictions);

    res.json({
      message: 'Cycle tracker updated successfully',
      tracker,
      predictions,
      notificationsCreated: true,
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

    // Get associated notifications
    const cycleNotifications = await CycleNotification.find({
      userId,
      cycleTrackerId: tracker._id,
    });

    res.json({
      tracker,
      predictions,
      notifications: cycleNotifications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateCycleTracker,
  getCycleTracker,
  createCycleNotifications,
  getHealthTips,
};
