# EventBooking Backend

This is the backend API for the EventBooking application, built with Node.js, Express, and MongoDB. It provides RESTful endpoints for user authentication, event management, booking, and category management, with robust security and validation features.

## Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (admin, user)
- Secure password hashing with bcryptjs
- Email verification and password reset (via nodemailer)

### Event Management

- CRUD operations for events (admin only for create, update, delete)
- Event image upload (using multer and cloudinary)
- Event categories management
- Slug generation for event URLs

### Booking System

- Book events and manage user bookings
- Prevent duplicate bookings
- View and cancel bookings
- Admin can view all bookings for an event

### User Management

- User registration and login
- Profile management
- Admin can manage users

### Security & Best Practices

- Rate limiting to prevent abuse
- Data sanitization against NoSQL injection and XSS
- HTTP security headers with helmet
- CORS enabled
- Centralized error handling

### Utilities

- API filtering, sorting, pagination (apiFeatures.js)
- Async error handling (catchAsync.js)
- Email sending utility

## Project Structure

```
server/
  app.js                # Express app setup and middleware
  server.js             # Entry point, DB connection, server start
  package.json          # Dependencies and scripts
  controllers/          # Route controllers for business logic
  dev-data/             # Seed data and scripts
  middleware/           # Custom middleware (auth, error, upload, validation)
  models/               # Mongoose models (User, Event, Booking, Category)
  routers/              # Express routers for API endpoints
  utils/                # Utility functions (API features, error handling, email, etc.)
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- MongoDB database (local or cloud)

### Installation

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file (see below).

### Environment Variables

Create a `.env` file in the `server` directory with the following:

```
PORT=5000
DATABASE=<your-mongodb-connection-string>
DATABASE_PASSWORD=<your-db-password>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=90d
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-password>
CLOUDINARY_CLOUD_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<cloudinary-key>
CLOUDINARY_API_SECRET=<cloudinary-secret>
```

### Running the Server

Start the development server with nodemon:

```bash
npm start
```

### Seeding the Database

To seed categories or events, run:

```bash
node dev-data/seed_catogories.js
node dev-data/seed_evets.js
```

### API Endpoints

- Auth Endpoints (`/api/v1/auth`)

  - `POST /signup` — Register a new user account.
  - `POST /login` — Log in and receive a JWT token.
  - `POST /forgotPassword` — Request a password reset link via email.
  - `PATCH /resetPassword/:token` — Reset password using a token sent to email.
  - `PATCH /updatePassword` — Update the current user's password (requires authentication).

- User Endpoints `(/api/v1/users)`
  - `PATCH /updateMe` — Update the current user's profile information.
  - `DELETE /deleteMe` — Delete the current user's account.
  - `GET /me` — Get the current user's profile information.
  - `PATCH /:id` — Update a user by ID (admin only).
  - `DELETE /:id` — Delete a user by ID (admin only).
- Event Endpoints (`/api/v1/events`)
  - `GET /` — Get a list of all events (requires authentication).
  - `POST /` — Create a new event (admin only; requires authentication).
  - `GET /:id` — Get details of a specific event by ID (requires - authentication).
  - `PUT /:id` — Update an event by ID (admin only; requires authentication).
  - `DELETE /:id` — Delete an event by ID (admin only; requires authentication).
  - `GET /:eventId/bookings` — Get all bookings for a specific event (admin only; requires authentication).
- Category Endpoints (/api/v1/categories)
  - `GET /` — Get a list of all event categories (requires authentication).
  - `POST /` — Create a new category (admin only; requires authentication).
  - `GET /:id/events` — Get all events for a specific category (requires authentication).
- Booking Endpoints (/api/v1/bookings)
  - `GET / — Get` all bookings for the current user (requires authentication).
  - `POST /` — Create a new booking for an event (requires authentication).
  - `GET /:id` — Get details of a specific booking by ID (requires authentication).
  - `DELETE /:id` — Cancel a booking by ID (requires authentication).
