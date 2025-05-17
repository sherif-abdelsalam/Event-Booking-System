// require("dotenv").config();

// const mongoose = require("mongoose");
// const app = require("./app");
// const DB = process.env.DATABASE;
// mongoose
//     .connect(DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD))
//     .then(() => {
//         console.log("DB connection successful!");
//     });

// const port = process.env.PORT || 5000;

// const server = app.listen(port, () => {
//     console.log(`App running on port ${port}...`);
// });

// process.on("unhandledRejection", (err) => {
//     console.log(err.name, "== " + err.message);
//     console.log("Shutting down the server.......");

//     server.close(() => {
//         process.exit();
//     });
// });

// process.on("uncaughtException", (err) => {
//     console.log(err.name, "== " + err.message);
// });

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

// Database connection (only initiate if not in serverless environment)
if (process.env.VERCEL_ENV !== "production") {
    const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
    mongoose.connect(DB).then(() => console.log("DB connection successful!"));
}

// Export the Express app for Vercel
module.exports = app;

// Local development: Start the server manually
if (require.main === module) {
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });

    // Error handling (local only)
    process.on("unhandledRejection", (err) => {
        console.log(err.name, "== " + err.message);
        console.log("Shutting down the server...");
        server.close(() => process.exit());
    });

    process.on("uncaughtException", (err) => {
        console.log(err.name, "== " + err.message);
    });
}