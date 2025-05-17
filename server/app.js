const morgan = require("morgan"); // http request logger
const express = require("express"); // web framework
const rateLimit = require("express-rate-limit"); // rate limiting
const helmet = require("helmet"); // security headers

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors"); // enable CORS

const usersRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const eventRouter = require("./routers/eventRouter");
const bookingRouter = require("./routers/bookingRouter");
const categoriesRouter = require("./routers/categoriesRouter");

const AppErrors = require("./utils/appErrors");
const globalErrorHandler = require("./middleware/errorMiddleware");
const app = express();

// set security HTTP headers like
app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// app.use(
//     cors({
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     })
// ); // use CORS middleware

app.use(express.json({ limit: "10kb" }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.use(
    hpp()
);

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        message: "Too many requests from this IP, please try again in an hour!",
    })
);



// app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Eventy API",
    });
});


app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req, res, next) => {
    next(new AppErrors(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
