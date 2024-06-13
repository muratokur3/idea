const express = require("express");
    const cookieParser = require('cookie-parser');
    const app = express();
    const mainRoute = require("./routes");
    const mongoose = require("mongoose");
    const logger = require("morgan");
    const cors = require("cors");
    const port = process.env.PORT||8080;
    const connectDB = async () => {
      mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected successfully via Mongoose'))
      .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
      });
    };
    
    
    
    //middleware
    app.use(logger("dev"));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
      origin: ["softwareistanbul.com.tr","https://softwareistanbul.com.tr", "https://devapi.softwareistanbul.com.tr"],
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
    
    

