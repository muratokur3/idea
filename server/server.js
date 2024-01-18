const express = require("express");
const app = express();
const mainRoute = require("./routes");
const mongoose = require("mongoose");
const port = 7000;
const dotenv = require("dotenv");
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
app.use(express.json());

app.use("/api", mainRoute);

app.listen(port, () => {
//   connectDB();
  console.log("Server is running on port 7000");
});
