const axios = require("axios");
const baseUrl = "http://localhost:4001";

module.exports = class UserController {
  static async getAll(req, res, next) {
    try {
      const { data } = await axios.get(baseUrl);
      const users = data.users;
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    // hit user service's get by id endpoint
    try {
      const { id } = req.params;
      const { data } = await axios.get(baseUrl + "/" + id);
      const user = data.user;
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    // hit user service's register endpoint
    try {
      const { email, password } = req.body;
      const { data } = await axios.post(baseUrl + "/register", {
        email,
        password,
      });
      const user = data.user;
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    // hit user service's delete by id endpoint
    try {
      const { id } = req.params;
      const { data } = await axios.delete(baseUrl + `/${id}`);
      res.status(200).json({ message: data.message });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const { data } = await axios.post(baseUrl + '/login', { email, password})
      const access_token = data.access_token
      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
};
