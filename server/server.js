const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const mainRoute = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT||8080;
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
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8080","localhost"],
  credentials: true,
  httpOnly: true,
  path: "/",
  session: true,
}));

app.use("/", mainRoute);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});


