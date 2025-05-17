// controllers/eventController.js
const Event = require("../models/eventModel");
const Booking = require("../models/bookingModel");
const AppErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("../utils/cloudinary");
const checkEventBooking = require("../utils/checkEventBooking");


// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Event.find()
        .populate('category', 'name -_id')
        .populate('createdBy', 'name -_id'), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    let events = await features.query;

    if (req.user) {
        events = await checkEventBooking(events, req.user._id);
    }
    // Pagination result
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
        success: true,
        count: events.length,
        totalEvents,
        data: events,
    });
});



// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate('category', 'name _id');

    if (!event) {
        return next(
            new AppErrors(`Event not found with id of ${req.params.id}`, 404)
        );
    }
    if (!req.user) {
        return next(
            new AppErrors(`User not found with id of ${req.params.id}`, 404)
        );
    }

    // Check if user has booked this event
    let isBooked = false;
    const booking = await Booking.findOne({
        eventId: event._id,
        userId: req.user.id,
        status: "confirmed",
    });

    isBooked = !!booking;

    // Convert to object so we can add the isBooked property
    const eventObj = event.toObject();
    eventObj.isBooked = isBooked;
    if (isBooked) {
        eventObj.bookingId = booking._id;
    }

    res.status(200).json({
        success: true,
        data: eventObj,
    });
});



// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = catchAsync(async (req, res, next) => {

    const { file } = req;
    const { name, description, category, date, venue, price, capacity } = req.body;
    const createdBy = req.user.id;

    if (!file) {
        return next(new AppErrors("Please upload an image", 400));
    }
    if (!name || !description || !category || !date || !venue || !price || !createdBy) {
        return next(new AppErrors("Please provide all required fields", 400));
    }

    let imageUrl = ""; // Initialize imageUrl
    const result = await cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "events" },
        async (error, result) => {
            if (error) return res.status(500).json({ error });
            imageUrl = result.secure_url;

            const event = await Event.create({
                name,
                description,
                category,
                date,
                venue,
                price,
                createdBy,
                capacity,
                imageUrl,
            });

            res.status(201).json({ status: "success", data: event });
        }
    );

    // stream the file buffer to Cloudinary
    result.end(req.file.buffer);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = catchAsync(async (req, res, next) => {
    let imageUrl = "";
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new AppErrors(`Event not found with id of ${req.params.id}`, 404)
        );
    }

    if (req.file) {
        imageUrl = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "events" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            stream.end(req.file.buffer);
        });
    }

    if (imageUrl) {
        req.body.imageUrl = imageUrl;
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
