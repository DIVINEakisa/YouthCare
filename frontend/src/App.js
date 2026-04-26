import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotificationCenter from "./components/NotificationCenter";
import EducationEnhanced from "./components/EducationEnhanced";
import CycleTrackerEnhanced from "./components/CycleTrackerEnhanced";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// API Configuration
const API_URL =
  process.env.REACT_APP_API_URL || "https://youthcare.onrender.com/api";

// ─── AI Chat Component ───────────────────────────────────────────────────────
function AIChatSection({ user }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi ${user.name}! 👋 I'm your YouthCare+ health assistant. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async (userMessage) => {
    try {
      // Map keywords to categories
      const categoryMap = {
        reproductive: /period|menstrual|menstruation|cramp|cervical|ovul|fertile|contraception|sti/i,
        mental: /stress|anxiety|depression|mood|mental|sad|worry|emotion|confident/i,
        nutrition: /nutrition|food|eat|diet|weight|vitamin|calor|protein|hydrat/i,
        safety: /safety|protection|safe|abuse|violence|consent|assault|harass/i,
        youth: /confidence|self|body|puberty|teen|young|adolescent|growing/i,
      };

      let category = null;
      for (const [cat, regex] of Object.entries(categoryMap)) {
        if (regex.test(userMessage)) {
          category = cat;
          break;
        }
      }

      if (!category) return;

      const response = await fetch(
        `${API_URL}/notifications/recommendations?category=${category}&limit=3`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setRecommendations([]);
    try {
      const res = await fetch(`${API_URL}/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, couldn't respond.",
        },
      ]);
      
      // Fetch recommendations after getting response
      await fetchRecommendations(text);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue. Visit your nearest clinic for urgent concerns.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto space-y-4 p-4"
        style={{ maxHeight: "420px" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {m.role === "assistant" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1"
                style={{ background: "#3f6212" }}
              >
                AI
              </div>
            )}
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed",
              )}
              style={{
                background: m.role === "user" ? "#3f6212" : "#f0f0f0",
                color: m.role === "user" ? "white" : "#333",
                borderRadius:
                  m.role === "user"
                    ? "18px 2px 18px 18px"
                    : "2px 18px 18px 18px",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0"
              style={{ background: "#3f6212" }}
            >
              AI
            </div>
            <div
              className="px-4 py-3 rounded-2xl"
              style={{ background: "#f0f0f0" }}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "#3f6212",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="flex gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 flex-none"
              style={{ background: "#3f6212" }}
            >
              ⭐
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-700 mb-2">Recommended Resources:</p>
              <div className="space-y-2">
                {recommendations.map((rec, i) => (
                  <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <p className="text-xs font-semibold text-gray-800">
                      {rec.icon} {rec.title ? (typeof rec.title === 'object' ? rec.title.en : rec.title) : rec.name}
                    </p>
                    {rec.type && <p className="text-xs text-gray-600">{rec.type}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-4 flex gap-2">
        <input
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Ask a health question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="hover:opacity-80 disabled:opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          style={{ background: "#3f6212" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Cycle Tracker ───────────────────────────────────────────────────────────
function CycleTracker() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!lastPeriod) return;
    const last = new Date(lastPeriod);
    const next = new Date(last);
    next.setDate(next.getDate() + cycleLength);
    const ovulation = new Date(next);
    ovulation.setDate(ovulation.getDate() - 14);
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    setResult({ next, ovulation, fertileStart, fertileEnd });
    alert(`📅 Next period expected: ${next.toDateString()}`);
  };

  const fmt = (d) =>
    d?.toLocaleDateString("en-RW", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
        <h3 className="font-bold text-pink-800 mb-4">🌸 Track Your Cycle</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
          <input
            type="number"
            value={cycleLength}
            min={21}
            max={35}
            onChange={(e) => setCycleLength(+e.target.value)}
            className="border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <button
          onClick={calculate}
          className="mt-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl px-6 py-2 text-sm font-semibold transition-colors"
        >
          Calculate
        </button>
      </div>
      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Next Period", value: fmt(result.next), icon: "📅" },
            { label: "Ovulation", value: fmt(result.ovulation), icon: "🌕" },
            {
              label: "Fertile Window",
              value: `${fmt(result.fertileStart)} – ${fmt(result.fertileEnd)}`,
              icon: "🌿",
            },
          ].map((item) => (
            <div key={item.label} className="border rounded-2xl p-4 bg-gray-50">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-semibold text-gray-600">
                {item.label}
              </div>
              <div className="text-sm font-bold mt-1 text-gray-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Clinic Finder ───────────────────────────────────────────────────────────
function ClinicFinder() {
  const CLINICS = [
    {
      name: "Kigali Health Centre",
      location: "Nyarugenge, Kigali",
      contact: "+250 788 123 456",
      hours: "Mon–Fri 8am–5pm",
    },
    {
      name: "King Faisal Hospital",
      location: "Kacyiru, Kigali",
      contact: "+250 252 582 421",
      hours: "24/7",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <span>⚠️</span>
        <p className="text-sm text-amber-800">
          Urgent? Visit a clinic immediately!
        </p>
      </div>
      {CLINICS.map((c) => (
        <div
          key={c.name}
          className="border border-gray-100 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex justify-between mb-2">
            <h4 className="font-bold text-gray-800 text-sm">{c.name}</h4>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {c.hours}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-1">📍 {c.location}</p>
          <p className="text-xs font-semibold" style={{ color: "#3f6212" }}>
            📞 {c.contact}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Education Section ──────────────────────────────────────────────────────
function EducationSection() {
  const [selectedCategory, setSelectedCategory] = useState("reproductive");
  const [language, setLanguage] = useState("en");
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/education/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch content when category or language changes
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${API_URL}/education/category/${selectedCategory}?language=${language}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        if (data.success) {
          setContent(data.data);
        } else {
          setError("Failed to load content");
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load educational content");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [selectedCategory, language]);

  const categoryEmojis = {
    reproductive: "🏥",
    mental: "🧠",
    youth: "👥",
    nutrition: "🥗",
    safety: "🛡️",
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition"
            style={{
              background: selectedCategory === category ? "#3f6212" : "#f0f0f0",
              color: selectedCategory === category ? "white" : "#333",
            }}
          >
            {categoryEmojis[category] || "📖"} {category}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="en">English</option>
          <option value="rw">Kinyarwanda</option>
        </select>
      </div>

      {loading && <p className="text-gray-500 text-sm">Loading content...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!loading && content && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {content.articles && content.articles.length > 0 ? (
            content.articles.map((article, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-3 bg-gray-50"
              >
                <div className="flex gap-2">
                  <span className="text-xl flex-shrink-0">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {article.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      📌 {article.source}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No articles available</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Mental Health Section ──────────────────────────────────────────────────
function MentalHealthSection() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    {
      emoji: "😊",
      label: "Happy",
      tips: ["Keep doing what makes you happy", "Share joy with others"],
    },
    {
      emoji: "😢",
      label: "Sad",
      tips: ["Talk to someone you trust", "Engage in activities you enjoy"],
    },
    {
      emoji: "😰",
      label: "Stressed",
      tips: ["Take deep breaths", "Take a break", "Exercise or go for a walk"],
    },
    {
      emoji: "😟",
      label: "Anxious",
      tips: ["Anxiety is normal", "Practice grounding techniques"],
    },
  ];

  const resources = [
    {
      title: "Deep Breathing",
      description: "Breathe in for 4, hold for 4, breathe out for 4",
      icon: "🫁",
    },
    {
      title: "Meditation",
      description: "Focus on your breath and clear your mind",
      icon: "🧘",
    },
    {
      title: "Physical Exercise",
      description: "Go for a walk, dance, or do any activity you enjoy",
      icon: "🏃",
    },
    {
      title: "Creative Expression",
      description: "Write, draw, sing, or express yourself creatively",
      icon: "🎨",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <h3 className="font-bold text-blue-800 mb-3 text-sm">
          How are you feeling?
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {moods.map((mood, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(mood)}
              className={`p-3 rounded-lg text-sm font-semibold transition text-center ${
                selectedMood?.label === mood.label
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-200 hover:bg-blue-50"
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs">{mood.label}</div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="bg-white border border-blue-200 rounded-lg p-3 text-sm">
            <h4 className="font-bold text-gray-800 mb-2">Tips for you:</h4>
            <ul className="space-y-1">
              {selectedMood.tips.map((tip, i) => (
                <li key={i} className="text-gray-700 text-xs flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h4 className="font-bold text-gray-800 text-sm">Quick Resources</h4>
        <div className="grid grid-cols-2 gap-2">
          {resources.map((r, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg p-2 bg-gray-50"
            >
              <div className="text-2xl mb-1">{r.icon}</div>
              <h5 className="font-semibold text-gray-800 text-xs mb-0.5">
                {r.title}
              </h5>
              <p className="text-xs text-gray-600">{r.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
        <p className="font-bold text-red-700 mb-1">⚠️ Need help?</p>
        <p className="text-xs text-gray-700">
          If you're in crisis, reach out to a trusted adult or contact emergency
          services.
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard Content (Protected) ──────────────────────────────────────────
function DashboardContent() {
  const { user, logout, loading } = useContext(AuthContext);
  const [section, setSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const navigate = useNavigate();

  // Fetch unread notification count on mount
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch(`${API_URL}/notifications/count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUnreadNotificationCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };
    fetchNotificationCount();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "#3f6212" }}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const NAV_ITEMS = [
    { id: "dashboard", label: "Home", icon: "🏠" },
    { id: "chat", label: "AI Chat", icon: "💬" },
    { id: "education", label: "Learn", icon: "📚" },
    { id: "mental", label: "Wellbeing", icon: "🧠" },
    { id: "clinics", label: "Clinics", icon: "🏥" },
    { id: "support", label: "Support", icon: "🆘" },
  ];

  const ALL_SECTIONS = [
    ...NAV_ITEMS,
    { id: "cycle", label: "Cycle Tracker", icon: "🌸" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#3f6212" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: "#2d4a0e" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-xl"
          >
            ☰
          </button>
          <span className="text-2xl">🌿</span>
          <span className="text-white font-extrabold text-lg">YouthCare+</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lime-200 text-sm hidden sm:block">
            Hi, {user.name}!
          </span>
          <button
            onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
            className="relative text-lime-200 hover:text-white transition-colors"
            title="Notifications"
          >
            <span className="text-2xl">🔔</span>
            {unreadNotificationCount > 0 && (
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
              </span>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="text-lime-200 hover:text-white text-xs px-2 py-1 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed md:sticky top-14 left-0 h-[calc(100vh-56px)] w-56 z-30 transition-transform overflow-y-auto pb-6",
            "md:translate-x-0",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
          style={{ background: "#2d4a0e" }}
        >
          <nav className="p-3 space-y-1">
            {ALL_SECTIONS.filter(
              (s) => s.id !== "cycle" || user.gender === "Female",
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                )}
                style={{
                  background: section === item.id ? "#d4f34d" : "transparent",
                  color: section === item.id ? "#3f6212" : "#d4f34d",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {section === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: "#d4f34d" }}
                  >
                    {user.gender === "Female" ? "👩" : "👦"}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900">
                      Welcome, {user.name}! 🌟
                    </h2>
                    <p className="text-sm text-gray-500">
                      Age {user.age} · {user.gender}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "chat",
                    icon: "💬",
                    label: "AI Health Chat",
                    color: "bg-blue-50 border-blue-100",
                    desc: "Ask health questions",
                  },
                  {
                    id: "education",
                    icon: "📚",
                    label: "Learn & Grow",
                    color: "bg-purple-50 border-purple-100",
                    desc: "Health education",
                  },
                  {
                    id: "mental",
                    icon: "🧠",
                    label: "Wellbeing",
                    color: "bg-orange-50 border-orange-100",
                    desc: "Track your mood",
                  },
                  {
                    id: "clinics",
                    icon: "🏥",
                    label: "Find a Clinic",
                    color: "bg-red-50 border-red-100",
                    desc: "Nearby clinics",
                  },
                  ...(user.gender === "Female"
                    ? [
                        {
                          id: "cycle",
                          icon: "🌸",
                          label: "Cycle Tracker",
                          color: "bg-pink-50 border-pink-100",
                          desc: "Track period",
                        },
                      ]
                    : []),
                ].map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSection(card.id)}
                    className={cn(
                      "border rounded-2xl p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5",
                      card.color,
                    )}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <div className="font-bold text-sm text-gray-800">
                      {card.label}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {card.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">💡 Health Tip</h3>
                <p className="text-sm text-gray-600">
                  Drink 8 glasses of water daily to stay healthy!
                </p>
              </div>
            </div>
          )}

          {section === "chat" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-5 border-b" style={{ background: "#f7fee7" }}>
                <h2 className="text-lg font-extrabold text-gray-900">
                  💬 AI Health Chat
                </h2>
              </div>
              <div className="p-5">
                <AIChatSection user={user} />
              </div>
            </div>
          )}

          {section === "cycle" && user.gender === "Female" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-5 border-b" style={{ background: "#f7fee7" }}>
                <h2 className="text-lg font-extrabold text-gray-900">
                  🌸 Cycle Tracker
                </h2>
              </div>
              <div className="p-5">
                <CycleTrackerEnhanced API_URL={API_URL} />
              </div>
            </div>
          )}

          {section === "clinics" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-5 border-b" style={{ background: "#f7fee7" }}>
                <h2 className="text-lg font-extrabold text-gray-900">
                  🏥 Find a Clinic
                </h2>
              </div>
              <div className="p-5">
                <ClinicFinder />
              </div>
            </div>
          )}

          {section === "education" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-5 border-b" style={{ background: "#f7fee7" }}>
                <h2 className="text-lg font-extrabold text-gray-900">
                  📚 Learn & Grow
                </h2>
              </div>
              <div className="p-5">
                <EducationEnhanced API_URL={API_URL} />
              </div>
            </div>
          )}

          {section === "mental" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-5 border-b" style={{ background: "#f7fee7" }}>
                <h2 className="text-lg font-extrabold text-gray-900">
                  🧠 Wellbeing
                </h2>
              </div>
              <div className="p-5">
                <MentalHealthSection />
              </div>
            </div>
          )}

          {section === "support" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-5 border-b" style={{ background: "#f7fee7" }}>
                <h2 className="text-lg font-extrabold text-gray-900">
                  🆘 Get Support
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-bold text-blue-900 mb-2">Multiple Ways to Connect</h3>
                  <p className="text-sm text-gray-700">Choose the support method that works best for you:</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: "📞", title: "Call Support", info: "+250 788 XXX XXX", time: "8 AM - 8 PM Daily" },
                    { icon: "💬", title: "Chat (In-App)", info: "Available now", time: "24/7" },
                    { icon: "📱", title: "USSD", info: "Dial *123#", time: "24/7 (No internet)" },
                    { icon: "📧", title: "Email", info: "support@youthcare.rw", time: "Response in 24h" },
                  ].map((method, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <h4 className="font-bold text-gray-800 mb-1">{method.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{method.info}</p>
                      <p className="text-xs text-gray-500">{method.time}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <h3 className="font-bold text-red-900 mb-2">🚨 Emergency?</h3>
                  <p className="text-sm text-gray-700 mb-2">Call <strong>999</strong> immediately or go to the nearest hospital.</p>
                </div>

                <button
                  onClick={() => setSection("chat")}
                  className="w-full text-white font-semibold py-3 rounded-lg transition"
                  style={{ background: "#3f6212" }}
                  onMouseEnter={(e) => e.target.style.background = "#2d4a0e"}
                  onMouseLeave={(e) => e.target.style.background = "#3f6212"}
                >
                  Start Chat Now 💬
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Notification Center Sidebar */}
      <NotificationCenter
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
        API_URL={API_URL}
      />
    </div>
  );
}

// ─── Main App Content with Routing ──────────────────────────────────────────
function AppContent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "#3f6212" }}
      >
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <DashboardContent /> : <Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={user ? <DashboardContent /> : <Navigate to="/login" />}
      />
      <Route path="*" element={user ? <DashboardContent /> : <Landing />} />
    </Routes>
  );
}

// ─── Main App with Router ────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
