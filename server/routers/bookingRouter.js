// routes/bookings.js
const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Booking routes
router
  .route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router
  .route('/:id')
  .get(protect, getBooking)
  .delete(protect, cancelBooking);

module.exports = router;

// Authentication Endpoints

// POST /api/auth/register - Register a new user
// POST /api/auth/login - Login and get JWT token

// Event Endpoints

// GET /api/events - Get all events
// GET /api/events/ - Get a specific event
// POST /api/events - Create a new event (admin only)
// PUT /api/events/ - Update an event (admin only)
// DELETE /api/events/ - Delete an event (admin only)

// Booking Endpoints

// GET /api/bookings - Get current user's bookings
// GET /api/bookings/ - Get a specific booking (admin only)
// POST /api/bookings - Create a new booking
// DELETE /api/bookings/ - Cancel a booking
// GET /api/events//bookings - Get all bookings for an event (admin only)
