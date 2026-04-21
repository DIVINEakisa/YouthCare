const Education = require("../models/Education");

// Get all education content with filters
exports.getEducationContent = async (req, res) => {
  try {
    const {
      category,
      language = "en",
      gender = "all",
      ageGroup = "all",
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (gender !== "all") {
      filter.targetAudience = { $in: ["all", gender] };
    } else {
      filter.targetAudience = { $in: ["all"] };
    }

    if (ageGroup !== "all") {
      filter.ageGroup = { $in: ["all", ageGroup] };
    }

    // Get content from database
    let content = await Education.find(filter).sort({
      category: 1,
      createdAt: 1,
    });

    // Transform content to only include requested language
    content = content.map((item) => ({
      _id: item._id,
      category: item.category,
      title: language === "rw" ? item.title.rw : item.title.en,
      description:
        language === "rw" ? item.description.rw : item.description.en,
      content: language === "rw" ? item.content.rw : item.content.en,
      icon: item.icon,
      type: item.type,
      videoUrl: item.videoUrl,
      targetAudience: item.targetAudience,
      ageGroup: item.ageGroup,
      source: item.source,
    }));

    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get content by category
exports.getContentByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { language = "en", gender = "all", ageGroup = "all" } = req.query;

    const filter = {
      category,
      isActive: true,
    };

    if (gender !== "all") {
      filter.targetAudience = { $in: ["all", gender] };
    } else {
      filter.targetAudience = { $in: ["all"] };
    }

    if (ageGroup !== "all") {
      filter.ageGroup = { $in: ["all", ageGroup] };
    }

    let content = await Education.find(filter).sort({ createdAt: 1 });

    // Group by type
    const grouped = {
      articles: [],
      videos: [],
      resources: [],
    };

    content.forEach((item) => {
      const transformed = {
        _id: item._id,
        title: language === "rw" ? item.title.rw : item.title.en,
        description:
          language === "rw" ? item.description.rw : item.description.en,
        content: language === "rw" ? item.content.rw : item.content.en,
        icon: item.icon,
        videoUrl: item.videoUrl,
        source: item.source,
      };

      if (item.type === "article") grouped.articles.push(transformed);
      else if (item.type === "video") grouped.videos.push(transformed);
      else if (item.type === "resource") grouped.resources.push(transformed);
    });

    res.json({
      success: true,
      category,
      data: grouped,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Education.distinct("category", { isActive: true });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Add education content
exports.addEducationContent = async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      content,
      icon,
      type,
      videoUrl,
      targetAudience,
      ageGroup,
      source,
    } = req.body;

    // Validate required fields
    if (!category || !title || !description || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create new education document
    const newContent = new Education({
      category,
      title,
      description,
      content,
      icon,
      type,
      videoUrl,
      targetAudience: targetAudience || ["all"],
      ageGroup: ageGroup || "all",
      source,
    });

    await newContent.save();
    res.status(201).json({ success: true, data: newContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update education content
exports.updateEducationContent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Education.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete education content
exports.deleteEducationContent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Education.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    res.json({ success: true, message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
