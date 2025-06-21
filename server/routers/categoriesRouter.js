const { Router } = require("express");
const {
  getAllCategories,
  createCategory,
  getCategoryEvents,
} = require("../controllers/categoryController");
const {
  protect,
  restrictTo,
  optionalAuth,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = Router();

router
  .route("/")
  .get(optionalAuth, getAllCategories) // Allow public access to view categories
  .post(protect, restrictTo("admin"), upload.single("image"), createCategory);

router.route("/:id/events").get(optionalAuth, getCategoryEvents); // Allow public access to view category events

module.exports = router;
