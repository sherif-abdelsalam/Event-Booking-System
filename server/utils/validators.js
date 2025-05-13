const { check } = require("express-validator");

// Validation for creating an event
exports.validateEventCreation = [
    
    check("name")
        .notEmpty()
        .withMessage("Event name is required")
        .isLength({ max: 100 })
        .withMessage("Event name cannot exceed 100 characters"),

    check("description")
        .notEmpty()
        .withMessage("Event description is required"),
    check("category")
        .notEmpty()
        .withMessage("Event category is required")
        .isMongoId()
        .withMessage("Invalid creator ID"),

    check("date")
        .notEmpty()
        .withMessage("Event date is required"),
    check("venue")
        .notEmpty()
        .withMessage("Event venue is required"),
    check("price")
        .notEmpty()
        .withMessage("Event price is required")
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),
    check("createdBy")
        .notEmpty()
        .withMessage("Event creator is required")
        .isMongoId()
        .withMessage("Invalid creator ID"),
    check("capacity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Capacity must be a non-negative integer"),

    // Optional fields

    check("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    check("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array of strings"),
    check("available")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Available must be a non-negative integer"),
];
