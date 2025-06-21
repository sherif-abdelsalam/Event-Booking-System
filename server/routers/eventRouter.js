// routes/events.js
const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const upload = require("../middleware/upload");

const { getEventBookings } = require("../controllers/bookingController");

const {
  protect,
  restrictTo,
  optionalAuth,
} = require("../middleware/authMiddleware");

// Include bookings router for nested routes
router.use(
  "/:eventId/bookings",
  protect,
  restrictTo("admin"),
  getEventBookings
);

// Event routes
router
  .route("/")
  .get(optionalAuth, getEvents) // Allow public access with optional auth for booking status
  .post(protect, restrictTo("admin"), upload.single("image"), createEvent);
router
  .route("/:id")
  .get(optionalAuth, getEvent) // Allow public access with optional auth for booking status
  .put(protect, restrictTo("admin"), upload.single("image"), updateEvent)
  .delete(protect, restrictTo("admin"), deleteEvent);

module.exports = router;
