const express = require("express");
const router = express.Router();
const Posts=require("../models/Posts.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPost = new Posts(data);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", (req, res) => {
  res.send("Tüm ürünler");
});

module.exports = router;
