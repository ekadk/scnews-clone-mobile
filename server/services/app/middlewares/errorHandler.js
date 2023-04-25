function errorHandler(error, req, res, next) {
  let code = 500;
  let message = "Internal Server Error";

  if (error.name === "email_required") {
    code = 400;
    message = "Email is required!";
  } else if (error.name === "password_required") {
    code = 400;
    message = "Password is required!";
  } else if (error.name === "invalid_login") {
    code = 401;
    message = "Invalid email/password";
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = error.errors[0].message;
  } else if (
    error.name === "invalid_token" ||
    error.name === "JsonWebTokenError"
  ) {
    code = 401
    message = 'Invalid token'
  } else if(error.name === 'post_not_found') {
    code = 404
    message = `Post with id ${error.postId} not found!`
  } else if(error.name === 'category_not_found') {
    code = 404
    message = `Category with id ${error.categoryId} not found!`
  } else if(error.name === 'AggregateError') {
    message = error.errors[0].message.split(': ')[1]
  }

    res.status(code).json({ message });
}

module.exports = errorHandler;
