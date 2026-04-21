import React, { useState, useEffect } from "react";
import { apiClient } from "../utils/api";

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState("reproductive");
  const [language, setLanguage] = useState("en");
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/education/categories");
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch content when category, language, gender, or ageGroup changes
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await apiClient.get(
          `/api/education/category/${selectedCategory}`,
          {
            params: {
              language,
              gender,
              ageGroup,
            },
          },
        );

        if (response.data.success) {
          setContent(response.data.data);
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
  }, [selectedCategory, language, gender, ageGroup]);

  const categoryTitles = {
    reproductive: {
      en: "Reproductive Health",
      rw: "Ubuzima bw'Ubudade",
    },
    mental: {
      en: "Mental Health",
      rw: "Ubwenge",
    },
    youth: {
      en: "Youth Education",
      rw: "Ubwenge bw'Abagore",
    },
    nutrition: {
      en: "Nutrition",
      rw: "Imvikire",
    },
    safety: {
      en: "Personal Safety",
      rw: "Ubwishingizi bwawe",
    },
  };

  const categoryEmojis = {
    reproductive: "🏥",
    mental: "🧠",
    youth: "👥",
    nutrition: "🥗",
    safety: "🛡️",
  };

  return (
    <div className="min-h-screen p-4" style={{ background: "#3f6212" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Learn & Grow 📚</h1>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Language Selector */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#3f6212" }}
              >
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                style={{ borderColor: "#3f6212" }}
              >
                <option value="en">English</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#3f6212" }}
              >
                Content For
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                style={{ borderColor: "#3f6212" }}
              >
                <option value="all">Everyone</option>
                <option value="female">Girls</option>
                <option value="male">Boys</option>
              </select>
            </div>

            {/* Age Group Filter */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#3f6212" }}
              >
                Age Group
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                style={{ borderColor: "#3f6212" }}
              >
                <option value="all">All Ages</option>
                <option value="10-13">10-13 years</option>
                <option value="13-16">13-16 years</option>
                <option value="16-19">16-19 years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-white text-white"
                  : "text-white hover:bg-opacity-80"
              }`}
              style={
                selectedCategory === category
                  ? { background: "#fff", color: "#3f6212" }
                  : { background: "#2d4a0e" }
              }
            >
              <span>{categoryEmojis[category] || "📖"}</span>
              {categoryTitles[category]?.[language] || "Category"}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-white text-xl">
              Loading educational content...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Content Display */}
        {!loading && content && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Articles */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">
                {language === "rw" ? "Ibitanzu" : "Articles"}
              </h2>
              {content.articles && content.articles.length > 0 ? (
                <div className="space-y-4">
                  {content.articles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{article.icon}</div>
                        <div className="flex-1">
                          <h3
                            className="text-lg font-bold mb-2"
                            style={{ color: "#3f6212" }}
                          >
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-2">
                            {article.description}
                          </p>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {article.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-3">
                            {language === "rw" ? "Inzira:" : "Source:"}{" "}
                            {article.source}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
                  {language === "rw"
                    ? "Nta bihindu bikeneye."
                    : "No articles available for this selection."}
                </div>
              )}
            </div>

            {/* Videos */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                {language === "rw" ? "Inzira" : "Videos"}
              </h2>
              {content.videos && content.videos.length > 0 ? (
                <div className="space-y-4">
                  {content.videos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      {video.videoUrl && (
                        <iframe
                          width="100%"
                          height="200"
                          src={video.videoUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="mb-4"
                        ></iframe>
                      )}
                      <div className="p-4">
                        <h3
                          className="text-sm font-bold"
                          style={{ color: "#3f6212" }}
                        >
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                          {language === "rw" ? "Inzira:" : "Source:"}{" "}
                          {video.source}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
                  {language === "rw"
                    ? "Nta inzira bikeneye."
                    : "No videos available for this selection."}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resources */}
        {!loading &&
          content &&
          content.resources &&
          content.resources.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {language === "rw" ? "Ibikoresho" : "Resources"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.videoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition block"
                  >
                    <div className="text-2xl mb-2">{resource.icon}</div>
                    <h3 className="font-bold" style={{ color: "#3f6212" }}>
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {resource.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
