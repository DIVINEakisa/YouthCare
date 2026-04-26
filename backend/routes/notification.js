const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");

// Get unread notifications
router.get("/unread", auth, notificationController.getUnreadNotifications);

// Get all notifications
router.get("/", auth, notificationController.getAllNotifications);

// Get notification count
router.get("/count", auth, notificationController.getNotificationCount);

// Get recommended content
router.get("/recommendations", auth, notificationController.getRecommendedContent);

// Mark all as read (must come before parametric route)
router.put("/mark-all/read", auth, notificationController.markAllAsRead);

// Mark notification as read
router.put("/:notificationId/read", auth, notificationController.markAsRead);

// Delete notification
router.delete("/:notificationId", auth, notificationController.deleteNotification);

module.exports = router;
