// controllers/bookingController.js
const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');
const AppErrors = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = catchAsync(async (req, res, next) => {
  let query;
  // If user is admin, get all bookings, otherwise get only user's bookings
  if (req.user.role === 'admin') {
    query = Booking.find()
      .populate({
        path: 'eventId',
        select: 'name date venue price imageUrl'
      })
      .populate({
        path: 'userId',
        select: 'username email'
      });
  } else {
    query = Booking.find({ userId: req.user.id }).populate({
      path: 'eventId',
      select: 'name date venue price imageUrl'
    });
  }

  const bookings = await query;

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate({
      path: 'eventId',
      select: 'name description date venue price imageUrl'
    })
    .populate({
      path: 'userId',
      select: 'username email'
    });

  if (!booking) {
    return next(
      new AppErrors(`Booking not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is booking owner or admin
  if (
    booking.userId._id.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new AppErrors(`Not authorized to access this booking`, 403));
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private

exports.createBooking = catchAsync(async (req, res, next) => {
  // Add user ID to request body
  req.body.userId = req.user.id;

  // Check if event exists
  const event = await Event.findById(req.body.eventId);

  if (!event) {
    return next(
      new AppErrors(`Event not found with id of ${req.body.eventId}`, 404)
    );
  }

  // Check if event has already ended
  if (new Date() > event.date) {
    return next(
      new AppErrors(`Cannot book an event that has already ended`, 400)
    );
  }

  // Check if event has capacity and if it's sold out
  if (event.capacity !== null && event.available <= 0) {
    return next(new AppErrors(`This event is sold out`, 400));
  }

  // Check if user already has a booking for this event
  const existingBooking = await Booking.findOne({
    eventId: req.body.eventId,
    userId: req.user.id,
    status: 'confirmed'
  });

  if (existingBooking) {
    return next(new AppErrors(`You have already booked this event`, 400));
  }

  // Create booking
  const booking = await Booking.create(req.body);

  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(
      new AppErrors(`Booking not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is booking owner or admin
  if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppErrors(`Not authorized to cancel this booking`, 403));
  }

  // Check if event has already happened
  const event = await Event.findById(booking.eventId);

  if (event && new Date() > event.date) {
    return next(
      new AppErrors(
        `Cannot cancel a booking for an event that has already happened`,
        400
      )
    );
  }

  // Update booking status to cancelled
  booking.status = 'cancelled';
  await booking.save();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get bookings for an event
// @route   GET /api/events/:eventId/bookings
// @access  Private/Admin
exports.getEventBookings = catchAsync(async (req, res, next) => {
  // Check if event exists
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    return next(
      new AppErrors(`Event not found with id of ${req.params.eventId}`, 404)
    );
  }

  // Get bookings for this event
  const bookings = await Booking.find({
    eventId: req.params.eventId
  }).populate({
    path: 'userId',
    select: 'username email'
  });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});
