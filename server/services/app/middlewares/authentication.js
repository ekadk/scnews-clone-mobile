const { decodeToken } = require("../helpers/jwt");
const axios = require("axios");

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) throw { name: "invalid_token" };

    const payload = decodeToken(access_token);

    const { data } = await axios.get(
      `http://localhost:4000/users/${payload.id}`
    );

    const user = data.user;

    if (!user) throw { name: "invalid_token" };
    console.log(user);
    req.user = { id: user.id };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
