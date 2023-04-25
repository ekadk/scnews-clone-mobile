function errorHandler(error, req, res, next) {
  let code = 500;
  let message = "Internal server error";
  console.log(error)

  if (error.name === "AxiosError") {
    code = error.response.status;
    message = error.response.data.message;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
