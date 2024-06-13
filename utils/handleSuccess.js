const handleSuccess = (res, data, message = "Success") => {
  res.status(200).json({
      status: "success",
      data,
      message
  });
};

module.exports = { handleSuccess };
