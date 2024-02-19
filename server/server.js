const express = require("express");
const app = express();
const path = require('path');
const mainRoute = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const port = 7000;
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use("/api", mainRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port 7000");
});


