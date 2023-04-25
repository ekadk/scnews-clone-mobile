const jwt = require("jsonwebtoken");
const SECRET = process.env.ADMIN_SECRETS;

function signToken(payload) {
  return jwt.sign(payload, SECRET);
}

function decodeToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { signToken, decodeToken };
