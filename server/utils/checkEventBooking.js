const Booking = require("../models/bookingModel");

const checkEventBooking = async (events, userId) => {

    const userBookings = await Booking.find({
        userId: userId,
        status: "confirmed",
    });

    const bookedEventIds = userBookings.map((booking) =>
        booking.eventId.toString()
    );

    events = events.map((event) => {
        const eventObj = event.toObject();
        eventObj.isBooked = bookedEventIds.includes(event._id.toString());
        return eventObj;
    });
    events = events.filter((event) => event.category !== null);

    return events;
}

module.exports = checkEventBooking;