const express = require('express');
const { handleError } = require('./utils/handleError');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use('/api', userRouter);


app.use((err, req, res, next) => {
    handleError(err, req, res, next);
});



module.exports = app;