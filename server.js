// Dependencies
const express = require("express");

// Initializing express app
const app = express();

// Configure app settings
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;

// Mount middleware

// Mount routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Tell express to listen
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
