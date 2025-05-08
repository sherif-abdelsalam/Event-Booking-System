require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const DB = process.env.DATABASE;
mongoose
  .connect(DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD))
  .then(() => {
    console.log("DB connection successful!");
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, "== " + err.message);
  console.log("Shutting down the server.......");

  server.close(() => {
    process.exit();
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, "== " + err.message);
});

// 4. API Development
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
// GET /api/bookings/ - Get a specific booking
// POST /api/bookings - Create a new booking
// DELETE /api/bookings/ - Cancel a booking
// GET /api/events//bookings - Get all bookings for an event (admin only)
