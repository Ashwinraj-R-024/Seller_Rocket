const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leads");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// routes
app.use("/api/leads", leadRoutes);

// server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});