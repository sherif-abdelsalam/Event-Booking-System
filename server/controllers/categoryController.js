const Category = require("../models/categoryModel");
const AppErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../utils/cloudinary");
const Event = require("../models/eventModel");
const checkEventBooking = require("../utils/checkEventBooking");

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find({ isActive: true, name: { $ne: 'other' } });
    if (!categories) {
        return next(new AppErrors("No categories found", 404));
    }

    res.status(200).json({
        success: true,
        data: categories,
    });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppErrors("No category found with that ID", 404));
    }

    res.status(200).json({
        success: true,
        data: category,
    });
});

exports.createCategory = catchAsync(async (req, res, next) => {
    const { file } = req;
    if (!file) {
        return next(new AppErrors("Please provide an image", 400));
    }
    const { name, description } = req.body;
    if (!name || !description) {
        return next(new AppErrors("Please provide name and description", 400));
    }
    let imageUrl = ""; // Initialize imageUrl
    const result = await cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "events/categories" },
        async (error, result) => {
            if (error) return res.status(500).json({ error });
            imageUrl = result.secure_url;

            const category = await Category.create({
                name,
                description,
                image: imageUrl,
            });

            res.status(201).json({ status: "success", data: category });
        }
    );

    // stream the file buffer to Cloudinary
    result.end(req.file.buffer);

});


exports.getCategoryEvents = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let categoryEvents = await Event.find({ category: id }).populate("category", "name -_id");
    if (req.user) {
        categoryEvents = await checkEventBooking(categoryEvents, req.user._id);
    }
    if (!categoryEvents) {
        return next(new AppErrors("No events found for this category", 404));
    }
    res.status(200).json({
        success: true,
        data: categoryEvents,
    });
});