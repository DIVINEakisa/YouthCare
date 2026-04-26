import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationCenter = ({ isOpen, onClose, API_URL }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.notifications.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    setLoading(false);
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // Update local state
      setNotifications(
        notifications.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n,
        ),
      );

      // Update unread count
      setUnreadCount(
        notifications.filter((n) => !n.read && n._id !== notificationId).length,
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${API_URL}/notifications/mark-all/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`${API_URL}/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const wasUnread = !notifications.find((n) => n._id === notificationId)?.read;
      setNotifications(notifications.filter((n) => n._id !== notificationId));

      if (wasUnread) {
        setUnreadCount(unreadCount - 1);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-96 bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold" style={{ color: "#3f6212" }}>
            Notifications
          </h2>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm px-2 py-1 rounded-lg transition"
                style={{ background: "#3f6212", color: "white" }}
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-2xl font-bold text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400 mt-2">
                You'll get notifications for cycle reminders and health tips
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => !notification.read && markAsRead(notification._id)}
                className={`p-4 rounded-lg border-l-4 cursor-pointer transition ${
                  notification.read
                    ? "bg-gray-50 border-gray-300"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{notification.icon}</span>
                      <h3 className="font-bold text-gray-800">
                        {notification.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {notification.message}
                    </p>

                    {/* Health Tips if available */}
                    {notification.relatedData?.healthTips && (
                      <div className="mt-2 bg-white p-2 rounded text-xs">
                        <p className="font-semibold text-gray-800 mb-1">
                          💡 Health Tips:
                        </p>
                        <ul className="space-y-1">
                          {notification.relatedData.healthTips.slice(0, 2).map(
                            (tip, idx) => (
                              <li key={idx} className="text-gray-700">
                                • {tip}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification._id);
                    }}
                    className="text-gray-400 hover:text-red-600 ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
