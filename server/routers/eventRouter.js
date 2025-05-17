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
    .get(protect, getEvents)
    .post(
        protect,
        restrictTo("admin"),
        upload.single("image"),
        createEvent
    );
router
    .route("/:id")
    .get(protect, getEvent)
    .put(protect, restrictTo("admin"), upload.single("image"), updateEvent)
    .delete(protect, restrictTo("admin"), deleteEvent);

module.exports = router;
