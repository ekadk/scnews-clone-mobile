if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.USER_PORT || 4001;
const cors = require("cors");
const { mongoConnect } = require("./config/mongoConnect");
const route = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(route);
app.use(errorHandler)

mongoConnect().then(() => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`users service is running on port ${PORT}`);
  });
});
