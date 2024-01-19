const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");



//yeni post oluşturur
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPost = new PostChema(data);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
//tüm postları getirir
router.get("/", async (req, res) => {
  try {
    const posts = await PostChema.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});
//id ye göre post getirir
router.get("/:id", async (req, res) => {
  if (!await PostChema.findById(req.params.id)) {
    return res.status(404).json("Post not found");
  }
  try {
    const postId = req.params.id;
    const post = await PostChema.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});
//id ye göre post günceller
router.put("/:id", async (req, res) => {
  if (!await PostChema.findById(req.params.id)) {
    return res.status(404).send("Post not found");
  }
  const postId = req.params.id;
  const updates = req.body;
  try {
    const ubdadetPost = await PostChema.findByIdAndUpdate(postId, updates, {
      new: true,
    });
    res.status(200).json(ubdadetPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//id ye göre post siler
router.delete("/:id", async (req, res) => {
  if (!await PostChema.findById(req.params.id)) {
    return res.status(404).json("Post not found");
  }
  try {
    const postId = req.params.id;
    const post = await PostChema.findByIdAndDelete(postId);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
