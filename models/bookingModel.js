// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    bookingDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed'
    },
    // Optional - For multiple tickets per booking
    quantity: {
      type: Number,
      default: 1,
      min: [1, 'Quantity must be at least 1']
    },
    // Optional - For special instructions or notes
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

// Create a compound index to prevent duplicate bookings
bookingSchema.index({ eventId: 1, userId: 1 }, { unique: true });

// Method to cancel booking
bookingSchema.methods.cancel = function() {
  this.status = 'cancelled';
  return this.save();
};

// Pre-save hook to update available spots in the Event
bookingSchema.pre('save', async function(next) {
  if (this.isNew && this.status === 'confirmed') {
    try {
      // Find the event and decrement available spots
      const Event = mongoose.model('Event');
      const event = await Event.findById(this.eventId);

      if (event && event.available !== null) {
        if (event.available < this.quantity) {
          return next(new Error('Not enough available spots for this event'));
        }

        event.available -= this.quantity;
        await event.save();
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// When a booking is cancelled, update the event's available spots
bookingSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();

  if (update && update.status === 'cancelled') {
    try {
      const booking = await this.model.findOne(this.getQuery());

      if (booking && booking.status === 'confirmed') {
        const Event = mongoose.model('Event');
        const event = await Event.findById(booking.eventId);

        if (event && event.available !== null) {
          event.available += booking.quantity;
          await event.save();
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
