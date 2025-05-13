// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Event name is required"],
            trim: true,
            maxlength: [100, "Event name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Event description is required"],
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Event category is required"],
        },
        date: {
            type: Date,
            required: [true, "Event date is required"],
        },
        venue: {
            type: String,
            required: [true, "Event venue is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Event price is required"],
            min: [0, "Price cannot be negative"],
        },
        imageUrl: {
            type: String,
            default: "default-event.jpg", // Default image if none provided
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // For optional enhancement - tags & categories
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        // Field to track available spots (optional)
        capacity: {
            type: Number,
            min: [0, "Capacity cannot be negative"],
            required: [true, "Event capacity is required"],
        },
        available: {
            type: Number,
            min: [0, "Available spots cannot be negative"],
            default: null, // null for unlimited capacity
        },
    },
    { timestamps: true }
);

// Pre-save hook to set available spots equal to capacity if capacity is set
eventSchema.pre("save", function (next) {
    if (this.isNew && this.capacity !== null && this.available === null) {
        this.available = this.capacity;
    }
    next();
});

// Virtual field for checking if the event is sold out
eventSchema.virtual("isSoldOut").get(function () {
    if (this.capacity === null) return false; // Unlimited capacity
    return this.available <= 0;
});

// Virtual field for checking if the event has already happened
eventSchema.virtual("hasEnded").get(function () {
    return new Date() > this.date;
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
