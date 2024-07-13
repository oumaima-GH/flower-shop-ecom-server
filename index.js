const express = require('express');
const { handleError } = require('./utils/handleError');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const userInfoRouter = require('./routes/userInfoRouter');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');
const addressRouter = require('./routes/addressRouter');
const reviewRouter = require('./routes/reviewRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const orderItemRouter = require('./routes/orderItemRouter');
const paymentRouter = require('./routes/paymentRouter');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', authRouter)
app.use('/api', userRouter);
app.use('/api', userInfoRouter)
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', addressRouter);
app.use('/api', reviewRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api', orderItemRouter);
app.use('/api', paymentRouter);


app.use((err, req, res, next) => {
    handleError(err, req, res, next);
  });


module.exports = app;