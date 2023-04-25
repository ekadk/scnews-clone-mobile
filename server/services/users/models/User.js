const { getDb } = require("../config/mongoConnect");
const { hashPw } = require("../helpers/hashPw");

module.exports = class User {
  static async findAll() {
    try {
      const collection = getDb().collection("users");
      const users = await collection.find().toArray();
      users.forEach((user) => {
        delete user.password;
      });
      return users;
    } catch (error) {
      return error;
    }
  }

  static async findById(id) {
    try {
      const collection = getDb().collection("users");
      const user = await collection.findOne({ id });
      return user
    } catch (error) {
      return error;
    }
  }

  static async create({ email, password }) {
    try {
      const collection = getDb().collection("users");

      const hashed = hashPw(password);
      const createdAt = new Date()
      const updatedAt = new Date()
      const id = await collection.countDocuments({}) + 1

      const user = { id, email, password: hashed, createdAt, updatedAt };
      const result = await collection.insertOne(user);

      return result;

    } catch (error) {
      return error;
    }
  }

  static async findOne(query) {
    try {
      const collection = getDb().collection("users");
      const user = await collection.findOne(query);
      return user;
    } catch (error) {
      return error;
    }
  }

  static async deleteOne(query) {
    try {
      const collection = getDb().collection("users");
      const result = await collection.deleteOne(query);
      return result
    } catch (error) {
      return error;
    }
  }
};
