// routes/bookings.js
const express = require("express");
const router = express.Router();

const {
  getBookings,
  getBooking,
  createBooking,
  cancelBooking,
  getMyBookings,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// Booking routes
router
  .route("/")
  .get(protect, getBookings)
  .post(protect, createBooking);

// Get current user's bookings
router.route("/myBookings").get(protect, getMyBookings);

router
  .route("/:id")
  .get(protect, getBooking)
  .delete(protect, cancelBooking);

module.exports = router;
