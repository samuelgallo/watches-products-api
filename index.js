require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

// database
require("./config/database");

// specifications
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/v1/products", require("./Routes/products"));

// middleware
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});

// Server
app.listen(port, () => {
  console.log(`App running at ${port}`);
});
