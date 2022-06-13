// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// Initializing express app
const app = express();

// Configure app settings
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;

// connect to mongoDB
mongoose.connect(MONGODB_URL);

// Mongo status listeners
mongoose.connection
  .on("connected", () => console.log("Connected to MongoDB"))
  .on("error", (err) => console.log("Error with MongoDB: " + err.message));

// Set up our model
const peopleSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    title: String,
  },
  { timestamps: true }
);

const People = mongoose.model("People", peopleSchema);

// Mount middleware
app.use(cors()); // Access-Control-Allow: '*'
app.use(morgan("dev")); // this creates req.body from incoming JSON request bodies
app.use(express.json()); // app.use(express.urlencoded({ extended: false}))
// 👆 only when express is serving HTML

// Mount routes
app.get("/", (req, res) => {
  res.send("Hello and welcome to the people app");
});

// Index
app.get("/people", async (req, res) => {
  try {
    const people = await People.find({});
    res.send(people);
  } catch (error) {
    console.log("error:", error);
    res.send({ error: "something went wrong - check console" });
  }
});
//non async await version
// app.get('/people', (req, res) => {
//     People.find({}, (err, people) => {
//         res.send(people);
//     });
// });

// Create

// Update

// Delete

// Tell express to listen
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
