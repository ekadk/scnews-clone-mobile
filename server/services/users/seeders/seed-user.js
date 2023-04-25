const { MongoClient } = require("mongodb");
require("dotenv").config();
const { hashPw } = require("../helpers/hashPw");
const uri = process.env.USER_DATABASE_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    const data = require("../db.json").map((user) => {
      user.createdAt = user.updatedAt = new Date();
      user.password = hashPw(user.password);
      return user;
    });

    const database = client.db("scNewsDatabase");
    const users = database.collection("users");

    const result = await users.insertMany(data);
    console.log(result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
