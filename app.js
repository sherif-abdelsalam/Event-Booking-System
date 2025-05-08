const morgan = require('morgan'); // http request logger
const express = require('express'); // web framework
const rateLimit = require('express-rate-limit'); // rate limiting
const helmet = require('helmet'); // security headers

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const usersRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const AppErrors = require('./utils/appErrors');
const globalErrorHandler = require('./middlewares/errorMiddleware');
const app = express();

// set security HTTP headers like
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too many requests from this IP, please try again in an hour!'
  })
);

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.all('*', (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
