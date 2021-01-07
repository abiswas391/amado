const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');
const viewRouter = require('./routes/viewRouter');
const orderRouter = require('./routes/orderRouter');
const orderController = require('./controllers/orderController');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// To make express understand which one is the static folder loction

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  orderController.webhookCheckout
);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/', viewRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/tours', tourRouter);
app.use('/api/v2/orders', orderRouter);

app.use(globalErrorHandler);

module.exports = app;
