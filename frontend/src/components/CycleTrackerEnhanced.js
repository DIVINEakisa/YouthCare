import React, { useState, useEffect } from "react";
import axios from "axios";

const CycleTrackerEnhanced = ({ API_URL }) => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [healthTips, setHealthTips] = useState([]);
  const [savedTrackers, setSavedTrackers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved cycle trackers on mount
  useEffect(() => {
    fetchSavedTrackers();
  }, []);

  const fetchSavedTrackers = async () => {
    try {
      const response = await axios.get(`${API_URL}/cycle-tracker`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success && response.data.tracker) {
        const tracker = response.data.tracker;
        setSavedTrackers([tracker]);
        if (tracker.lastPeriodDate) {
          setLastPeriod(tracker.lastPeriodDate.split("T")[0]);
          setCycleLength(tracker.cycleLength || 28);
        }

        // Set health tips if available
        if (tracker.healthTips) {
          setHealthTips(tracker.healthTips);
        }
      }
    } catch (error) {
      console.error("Error fetching cycle tracker:", error);
    }
  };

  const calculate = async () => {
    if (!lastPeriod) {
      alert("Please select your last period date");
      return;
    }

    setLoading(true);
    try {
      // Send to backend to save and get predictions
      const response = await axios.post(
        `${API_URL}/cycle-tracker/update`,
        {
          lastPeriodDate: lastPeriod,
          cycleLength: cycleLength,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        const tracker = response.data.tracker;
        const predictions = response.data.predictions;

        // Calculate dates
        const last = new Date(lastPeriod);
        const next = new Date(last);
        next.setDate(next.getDate() + cycleLength);

        const ovulation = new Date(predictions.ovulationDate);
        const fertileStart = new Date(predictions.fertilityWindow.start);
        const fertileEnd = new Date(predictions.fertilityWindow.end);

        setResult({
          next,
          ovulation,
          fertileStart,
          fertileEnd,
          phase: predictions.phase,
        });

        // Set health tips
        if (tracker.healthTips) {
          setHealthTips(tracker.healthTips);
        }

        // Fetch associated notifications
        if (tracker._id) {
          fetchCycleNotifications(tracker._id);
        }

        alert(`📅 Next period expected: ${next.toDateString()}`);
      }
    } catch (error) {
      console.error("Error calculating cycle:", error);
      alert("Error saving cycle tracker. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCycleNotifications = async (trackerId) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications?trackerId=${trackerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fmt = (d) =>
    d?.toLocaleDateString("en-RW", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const phaseInfo = {
    menstrual: {
      emoji: "🩸",
      name: "Menstrual Phase",
      duration: "Days 1-5",
      color: "bg-red-50 border-red-200",
      advice:
        "Take it easy. Stay hydrated, eat iron-rich foods, and listen to your body.",
    },
    follicular: {
      emoji: "🌱",
      name: "Follicular Phase",
      duration: "Days 1-13",
      color: "bg-green-50 border-green-200",
      advice:
        "Energy levels are rising! Great time for workouts and starting new projects.",
    },
    ovulation: {
      emoji: "🌕",
      name: "Ovulation Phase",
      duration: "Days 12-16",
      color: "bg-yellow-50 border-yellow-200",
      advice:
        "Peak fertility and energy. Most fertile 5 days before and 1 day after ovulation.",
    },
    luteal: {
      emoji: "🌙",
      name: "Luteal Phase",
      duration: "Days 17-28",
      color: "bg-blue-50 border-blue-200",
      advice:
        "Mood may shift. Self-care is important. Magnesium and omega-3 supplements help.",
    },
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
        <h3 className="font-bold text-pink-800 mb-4">🌸 Track Your Cycle</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Period Started
            </label>
            <input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cycle Length (days)
            </label>
            <input
              type="number"
              value={cycleLength}
              min={21}
              max={35}
              onChange={(e) => setCycleLength(+e.target.value)}
              className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          disabled={loading}
          className="mt-4 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl px-6 py-2 text-sm font-semibold transition-colors"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {/* Predictions Section */}
      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Next Period",
                value: fmt(result.next),
                icon: "📅",
                color: "text-red-600",
              },
              {
                label: "Ovulation",
                value: fmt(result.ovulation),
                icon: "🌕",
                color: "text-yellow-600",
              },
              {
                label: "Fertile Window",
                value: `${fmt(result.fertileStart)} – ${fmt(result.fertileEnd)}`,
                icon: "🌿",
                color: "text-green-600",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border rounded-2xl p-4 bg-gray-50 hover:shadow-md transition"
              >
                <div className={`text-2xl mb-1 ${item.color}`}>{item.icon}</div>
                <div className="text-xs font-semibold text-gray-600">
                  {item.label}
                </div>
                <div className="text-sm font-bold mt-1 text-gray-800">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Current Phase */}
          {result.phase && (
            <div
              className={`border rounded-2xl p-5 ${phaseInfo[result.phase]?.color}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{phaseInfo[result.phase]?.emoji}</span>
                <div>
                  <h4 className="font-bold text-lg">
                    {phaseInfo[result.phase]?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {phaseInfo[result.phase]?.duration}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {phaseInfo[result.phase]?.advice}
              </p>
            </div>
          )}

          {/* Health Tips */}
          {healthTips.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h4 className="font-bold text-blue-900 mb-3">💡 Health Tips</h4>
              <div className="space-y-2">
                {healthTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-lg flex gap-2 text-sm"
                  >
                    <span className="text-lg flex-shrink-0">✓</span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Notifications */}
          {notifications.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
              <h4 className="font-bold text-purple-900 mb-3">🔔 Reminders</h4>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notif, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg text-sm">
                    <div className="flex gap-2 items-start">
                      <span className="text-lg">{notif.icon || "📢"}</span>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Cycle Information */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-5">
        <h4 className="font-bold text-gray-800 mb-3">📖 Your Cycle Phases</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(phaseInfo).map(([key, phase]) => (
            <div
              key={key}
              className={`border rounded-lg p-3 ${phase.color} cursor-help hover:shadow-md transition`}
              title={phase.advice}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{phase.emoji}</span>
                <h5 className="font-semibold text-sm text-gray-800">
                  {phase.name}
                </h5>
              </div>
              <p className="text-xs text-gray-600">{phase.duration}</p>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {phase.advice}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold mb-2">📱 Stay Connected:</p>
        <ul className="space-y-1 text-xs">
          <li>
            • 🔔 <strong>Notifications:</strong> Get alerts 7 days before, 2 days
            before, and on ovulation day
          </li>
          <li>
            • 📱 <strong>Push Notifications:</strong> Enable browser notifications
            for reminders
          </li>
          <li>
            • 💾 <strong>Auto-Save:</strong> Your cycle data is automatically saved
            securely
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CycleTrackerEnhanced;
