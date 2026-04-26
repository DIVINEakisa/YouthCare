import React, { useState, useEffect } from "react";
import axios from "axios";
import { speakText, stopSpeech } from "../utils/accessibility";

const EducationEnhanced = ({ API_URL }) => {
  const [selectedCategory, setSelectedCategory] = useState("reproductive");
  const [selectedType, setSelectedType] = useState("all");
  const [language, setLanguage] = useState("en");
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const categoryEmojis = {
    reproductive: "🏥",
    mental: "🧠",
    youth: "👥",
    nutrition: "🥗",
    safety: "🛡️",
  };

  const typeEmojis = {
    article: "📄",
    video: "🎥",
    resource: "🔗",
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/education/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch content and recommendations
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}/education/category/${selectedCategory}?language=${language}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          let filtered = [];

          // Combine all content types from grouped response
          const grouped = response.data.data;
          const allContent = [
            ...(grouped.articles || []),
            ...(grouped.videos || []),
            ...(grouped.resources || []),
          ];

          // Filter by type
          if (selectedType === "all") {
            filtered = allContent;
          } else if (selectedType === "article") {
            filtered = grouped.articles || [];
          } else if (selectedType === "video") {
            filtered = grouped.videos || [];
          } else if (selectedType === "resource") {
            filtered = grouped.resources || [];
          }

          setContent(filtered);

          // Fetch recommendations for this category
          fetchRecommendations(selectedCategory);
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
  }, [selectedCategory, language, selectedType]);

  const fetchRecommendations = async (category) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/recommendations?category=${category}&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setRecommendations(response.data.recommendations);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  const handleTextToSpeech = (text) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      speakText(text, language);
      setIsSpeaking(true);
    }
  };

  const renderContent = (item) => {
    if (item.type === "video" && item.videoUrl) {
      // Extract YouTube video ID
      const videoId = item.videoUrl.includes("youtu.be")
        ? item.videoUrl.split("/").pop()
        : item.videoUrl.split("v=")[1];

      return (
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?cc_load_policy=1`}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">
            📺 Video - {item.source} | Captions enabled
          </p>
        </div>
      );
    } else if (item.type === "resource") {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-gray-700 mb-2">{item.description}</p>
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2"
          >
            🔗 Open External Resource
            <span>↗</span>
          </a>
          <p className="text-xs text-gray-500 mt-2">Verified Source: {item.source}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.content}
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={() => handleTextToSpeech(item.content)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                isSpeaking
                  ? "bg-red-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isSpeaking ? "⏹ Stop" : "🔊 Listen (Text-to-Speech)"}
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-600 hover:bg-gray-700 text-white transition"
            >
              🖨 Print
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Language */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#3f6212" }}>
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            >
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#3f6212" }}>
              Content Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="article">📄 Articles</option>
              <option value="video">🎥 Videos</option>
              <option value="resource">🔗 Resources</option>
            </select>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#3f6212" }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryEmojis[cat]} {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-500">
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#3f6212" }}>
            💡 Recommended for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recommendations.map((rec) => (
              <div key={rec._id} className="bg-white p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span>{typeEmojis[rec.type]}</span>
                  <span className="font-semibold text-gray-800">{rec.title[language] || rec.title.en}</span>
                </div>
                <p className="text-xs text-gray-600">Source: {rec.source}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading content...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Content Display */}
      {!loading && content && (
        <div className="space-y-4">
          {content.length > 0 ? (
            content.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.title[language] || item.title.en}
                          </h3>
                          <div className="flex gap-2 text-xs">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {typeEmojis[item.type]} {item.type}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                              ✓ {item.source}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                  {/* Content */}
                  <div className="mb-4">{renderContent(item)}</div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
                    Verified by {item.source} • Suitable for all ages
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-500">
                No {selectedType !== "all" ? selectedType : ""} content available in this category.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Accessibility Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold mb-2">♿ Accessibility Features:</p>
        <ul className="space-y-1 text-xs">
          <li>• 🔊 <strong>Text-to-Speech:</strong> Click "Listen" button on any article to hear it read aloud</li>
          <li>• 📺 <strong>Video Captions:</strong> All videos have captions enabled (YouTube CC)</li>
          <li>• 🔤 <strong>Large Text:</strong> Use Ctrl + Plus to increase text size in your browser</li>
          <li>• 🌐 <strong>Simple Language:</strong> All content written in easy-to-understand words</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationEnhanced;
