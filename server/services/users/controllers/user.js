const { ObjectId } = require("mongodb");
const { hashPw, comparePw } = require("../helpers/hashPw");
const { signToken } = require("../helpers/jwt");
const User = require("../models/User");

module.exports = class UserController {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findById(+id);
      if (!result) throw { name: "USER_NOT_FOUND", userId: id };
      delete result.password;
      res.status(200).json({ user: result });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "VALIDATION_ERROR_EMAIL" };
      if (!password) throw { name: "VALIDATION_ERROR_PASSWORD" };

      const duplicate = await User.findOne({ email });
      if (duplicate) throw { name: "DUPLICATE_USER" };

      const user = { email, password };
      await User.create(user);

      const newUser = await User.findOne({ email });

      res.status(201).json({
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(+id);
      if (!user) throw { name: "USER_NOT_FOUND", userId: id };

      await User.deleteOne({ id: +id });
      res.status(200).json({ message: `User with id ${id} deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "VALIDATION_ERROR_EMAIL" };
      if (!password) throw { name: "VALIDATION_ERROR_PASSWORD" };

      const user = await User.findOne({ email });
      if (!user) throw { name: "INVALID_LOGIN" };

      const checkPass = comparePw(password, user.password);
      if (!checkPass) throw { name: "INVALID_LOGIN" };

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
