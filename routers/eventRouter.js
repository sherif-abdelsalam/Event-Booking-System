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

const { validateRequest } = require("../middleware/validation");
const { validateEventCreation } = require("../utils/validators");

const { getEventBookings } = require("../controllers/bookingController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

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
  .get(getEvents)
  .post(
    protect,
    restrictTo("admin"),
    validateEventCreation,
    validateRequest,
    createEvent
  );

router
  .route("/:id")
  .get(getEvent)
  .put(protect, restrictTo("admin"), updateEvent)
  .delete(protect, restrictTo("admin"), deleteEvent);

module.exports = router;
