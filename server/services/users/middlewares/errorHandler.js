function errorHandler(error, req, res, next) {
  let code = 500;
  let message = "Internal Server Error";
  console.log(error)

  if (error.name === "VALIDATION_ERROR_EMAIL") {
    code = 400;
    message = "Email is required!";
  } else if (error.name === "VALIDATION_ERROR_PASSWORD") {
    code = 400;
    message = "Password is required!";
  } else if (error.name === "USER_NOT_FOUND") {
    code = 404;
    message = `User with id ${error.userId} not found!`;
  } else if (error.name === "DUPLICATE_USER") {
    code = 400;
    message = "Email already used!";
  } else if (error.name === "INVALID_LOGIN") {
    code = 401;
    message = "Invalid email/password";
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
