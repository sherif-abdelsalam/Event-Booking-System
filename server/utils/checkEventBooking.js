const Booking = require("../models/bookingModel");

const checkEventBooking = async (events, userId) => {
    // Fetch confirmed bookings for this user
    const userBookings = await Booking.find({
        userId: userId,
        status: "confirmed",
    });

    // Map eventId (as string) to bookingId for fast lookup
    const bookedEventMap = new Map();
    userBookings.forEach((booking) => {
        bookedEventMap.set(booking.eventId.toString(), booking._id.toString());
    });

    // Process and annotate each event
    const annotatedEvents = events
        .filter(event => event.category !== null) // filter first for performance
        .map((event) => {
            const eventObj = event.toObject();
            const eventIdStr = event._id.toString();

            if (bookedEventMap.has(eventIdStr)) {
                eventObj.isBooked = true;
                eventObj.bookingId = bookedEventMap.get(eventIdStr);
            } else {
                eventObj.isBooked = false;
            }

            return eventObj;
        });

    return annotatedEvents;
};

module.exports = checkEventBooking;
