require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// middleware
app.use(express.json());

const { MONGODB_URI, PORT } = process.env;

// cors for cross origin requests from client http://localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));

// connecting to MongoDB
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

// defining routes

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
