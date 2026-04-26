const Notification = require("../models/Notification");
const CycleNotification = require("../models/CycleNotification");
const Education = require("../models/Education");

// Get all unread notifications for user
exports.getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({
      userId,
      read: false,
    })
      .populate("contentId")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all notifications for user
exports.getAllNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 20, skip = 0 } = req.query;

    const notifications = await Notification.find({ userId })
      .populate("contentId")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Notification.countDocuments({ userId });

    res.json({
      success: true,
      total,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.userId;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    if (notification.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.userId;

    await Notification.updateMany(
      { userId, read: false },
      { read: true },
    );

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.userId;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    if (notification.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Notification.findByIdAndDelete(notificationId);

    res.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create notification (internal use)
exports.createNotification = async (userId, title, message, type = "reminder", contentId = null, icon = "🔔") => {
  try {
    const notification = new Notification({
      userId,
      title,
      message,
      type,
      contentId,
      icon,
    });

    await notification.save();
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// Get recommended content based on activity
exports.getRecommendedContent = async (req, res) => {
  try {
    const { category, limit = 3 } = req.query;

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const content = await Education.find(query)
      .limit(parseInt(limit))
      .select("_id title type category icon source");

    res.json({
      success: true,
      recommendations: content,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get notification count
exports.getNotificationCount = async (req, res) => {
  try {
    const userId = req.userId;

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false,
    });

    res.json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
