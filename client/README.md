# EventBooking Client

This is the frontend (client) for the EventBooking application, built with [Create React App](https://github.com/facebook/create-react-app) and styled using [Tailwind CSS](https://tailwindcss.com/).

## Folder Structure

```
client/
├── .env
├── .gitignore
├── jsconfig.json
├── package.json
├── README.md
├── tailwind.config.js
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── assets/
│       ├── facebook.png
│       ├── google.png
│       ├── Logo.png
│       ├── search-normal.svg
│       └── ticket.png
└── src/
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    ├── assets/
    │   ├── default-event.png
    │   ├── hero.png
    │   └── more-circle.svg
    ├── auth/
    │   ├── authContext.js
    │   ├── authServices.js
    │   ├── protectRoute.js
    │   └── roleRoute.js
    ├── components/
    │   ├── button.js
    │   ├── deletePopUp.js
    │   ├── image.js
    │   └── ...
    ├── constants/
    ├── pages/
    ├── utils/
    └── validations/
```

## Key Features

- **React 19** with functional components and hooks
- **Routing** via `react-router-dom`
- **Authentication** context and protected routes
- **Tailwind CSS** for styling and custom themes
- **Component-based** structure for reusability
- **Environment variables** via `.env` file

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Navigate to the `client` directory:

   ```sh
   cd client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)

---
