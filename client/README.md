# EventBooking Frontend

This is the frontend for the EventBooking application, built with React and Tailwind CSS. It provides a user interface for browsing, booking, and managing events, as well as user authentication and admin features.

## Features

- User registration and login
- Browse and filter events by category
- Book and manage event bookings
- View and cancel bookings
- Admin dashboard for event management
- Protected routes for authenticated and admin users
- Creation, editing, and deletion of events by admin

## Project Structure

```
client/
  public/                 # Static assets and HTML template
    assets/               # Images and icons
  src/
    assets/               # App-specific images and icons
    auth/                 # Authentication context and route protection
    components/           # Reusable UI components
      admin/              # Admin dashboard components
      auth/               # Auth-related UI components
      events/             # Event-related UI components
      home/               # Home page components
    constants/            # App-wide constants
    pages/                # Page components (Home, Login, Register, etc.)
      Admin/              # Admin-specific pages
    utils/                # Utility functions
    validations/          # Form validation logic
    App.js                # Main app component
    index.js              # Entry point
    App.css, index.css    # Global styles
  package.json            # Project dependencies and scripts
  tailwind.config.js      # Tailwind CSS configuration
  jsconfig.json           # JS/TS path aliases
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

## Libraries Used

- React
- React Router
- Tailwind CSS
- Formik (for form handling)
- Yup (for form validation)
- React Toastify (for notifications)
- Lucide-React (for icons)
- Date-fns (for date handling)
- Cloudinary (for image upload and management)

### Installation

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).
