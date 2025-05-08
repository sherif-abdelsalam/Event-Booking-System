// controllers/eventController.js
const Event = require("../models/eventModel");
const Booking = require("../models/bookingModel");
const AppErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let events = await features.query;

  //   let query;
  //   // Copy req.query
  //   const reqQuery = { ...req.query };

  //   // Fields to exclude
  //   const removeFields = ['select', 'sort', 'page', 'limit'];

  //   // Loop over removeFields and delete them from reqQuery
  //   removeFields.forEach(param => delete reqQuery[param]);

  //   // Create query string
  //   let queryStr = JSON.stringify(reqQuery);

  //   // Create operators ($gt, $gte, etc)
  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //   // Finding resource
  //   query = Event.find(JSON.parse(queryStr));

  //   // Select Fields
  //   if (req.query.select) {
  //     const fields = req.query.select.split(',').join(' ');
  //     query = query.select(fields);
  //   }

  //   // Sort
  //   if (req.query.sort) {
  //     const sortBy = req.query.sort.split(',').join(' ');
  //     query = query.sort(sortBy);
  //   } else {
  //     query = query.sort('-date'); // Default sort by date (newest first)
  //   }

  //   // Pagination
  //   const page = parseInt(req.query.page, 10) || 1;
  //   const limit = parseInt(req.query.limit, 10) || 10;
  //   const startIndex = (page - 1) * limit;
  //   const endIndex = page * limit;
  //   const total = await Event.countDocuments(JSON.parse(queryStr));

  //   query = query.skip(startIndex).limit(limit);

  // Check if authenticated user
  //   let events = await query;

  // If user is logged in, check if they have booked each event
  if (req.user) {
    // Get user's bookings
    const userBookings = await Booking.find({
      userId: req.user.id,
      status: "confirmed",
    });

    // Map bookings to event IDs
    const bookedEventIds = userBookings.map((booking) =>
      booking.eventId.toString()
    );

    // Add isBooked flag to each event
    events = events.map((event) => {
      const eventObj = event.toObject();
      eventObj.isBooked = bookedEventIds.includes(event._id.toString());
      return eventObj;
    });
  }

  // Pagination result
  //   const pagination = {};

  //   if (endIndex < total) {
  //     pagination.next = {
  //       page: page + 1,
  //       limit
  //     };
  //   }

  //   if (startIndex > 0) {
  //     pagination.prev = {
  //       page: page - 1,
  //       limit
  //     };
  //   }

  res.status(200).json({
    success: true,
    count: events.length,
    // pagination,
    data: events,
  });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(
      new AppErrors(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user has booked this event
  let isBooked = false;

  if (req.user) {
    const booking = await Booking.findOne({
      eventId: event._id,
      userId: req.user.id,
      status: "confirmed",
    });

    isBooked = !!booking;
  }

  // Convert to object so we can add the isBooked property
  const eventObj = event.toObject();
  eventObj.isBooked = isBooked;

  res.status(200).json({
    success: true,
    data: eventObj,
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.date || !req.body.price) {
    return next(new AppErrors("Please provide all required fields", 400));
  }
  const event = await Event.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = catchAsync(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new AppErrors(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is event creator or admin
  if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new AppErrors(
        `User ${req.user.id} is not authorized to update this event`,
        403
      )
    );
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new AppErrors(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is event creator or admin
  if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new AppErrors(
        `User ${req.user.id} is not authorized to delete this event`,
        403
      )
    );
  }

  // Check if event has any bookings
  const bookings = await Booking.find({ eventId: event._id });

  if (bookings.length > 0) {
    return next(
      new AppErrors(`Cannot delete event with existing bookings`, 400)
    );
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
