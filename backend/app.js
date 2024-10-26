// app.js
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const ruleRoutes = require("./routes/ruleRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/rules", ruleRoutes);

module.exports = app;
