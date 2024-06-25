const express = require('express');
const { handleError } = require('./utils/handleError');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const userInfoRouter = require('./routes/userInfoRouter');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');
const addressRouter = require('./routes/addressRouter');
const app = express();

app.use(express.json());

app.use('/api', authRouter)
app.use('/api', userRouter);
app.use('/api', userInfoRouter)
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', addressRouter);


app.use((err, req, res, next) => {
    handleError(err, req, res, next);
  });


module.exports = app;