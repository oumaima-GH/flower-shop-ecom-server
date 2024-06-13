//Response Handler for success responses
const handleSuccess = (res, data, statusCode = 200, message = "Success") => {
    res.status(statusCode).json({
      statusCode: statusCode || 200,
      message,
      data,
    });
  };
  
  module.exports = { handleSuccess };