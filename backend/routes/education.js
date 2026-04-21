const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

// Public routes
router.get("/categories", educationController.getCategories);
router.get("/content", educationController.getEducationContent);
router.get("/category/:category", educationController.getContentByCategory);

// Admin routes (can add authentication middleware later)
router.post("/add", educationController.addEducationContent);
router.put("/update/:id", educationController.updateEducationContent);
router.delete("/delete/:id", educationController.deleteEducationContent);

module.exports = router;
