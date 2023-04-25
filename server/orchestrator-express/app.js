const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`express-orchestrator is running on port ${PORT}`)
})