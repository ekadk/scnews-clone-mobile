const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.USER_DATABASE_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let db;

async function mongoConnect() {
  try {
    const database = client.db("scNewsDatabase");
    db = database
    return database
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return db;
}

module.exports = { mongoConnect, getDb };