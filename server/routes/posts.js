const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");

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

//keşfet sayfası için en çok beğeni alan 3 postu getirir
router.get("/explore", async (req, res) => {
  try {
    const posts = await PostChema.find().sort({ likesCount: -1 }).limit(3);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//hashTag e göre post getirir
router.get("/explore/:hashtag", async (req, res) => {
  try {
    const hashtag= await HashtagChema.findOne({name:req.params.hashtag});
    const posts = await PostChema.find({
      hashtags: { $in: [hashtag._id] },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//id ye göre post getirir
router.get("/:id", async (req, res) => {
  if (!(await PostChema.findById(req.params.id))) {
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

//userId den postları getirir(profile)
router.get("/profile/:username", async (req, res) => {
  try {
    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
    const userPosts = await PostChema.find({ userId: currentUser._id });
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin takip ettiği kişilerin postlarını getirir
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await UserChema.findById(req.params.userId);
    const userPosts = await PostChema.find({ userId: currentUser._id });
    console.log(userPosts);
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return PostChema.find({ userId: friendId });
      })
    );
    console.log(friendPosts);
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin takip ettiği hashtaglerin postlarını getirir
router.get("/privateMe/:userId", async (req, res) => {
  try {
    const currentUser = await UserChema.findById(req.params.userId);
    const hashtagPosts = await PostChema.find({
      hashtags: { $in: currentUser.hashtags },
    });
    res.status(200).json(hashtagPosts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin beğendiği postları getirir
router.get("/like/:username", async (req, res) => {
  try {
    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
    const likesPost = await Promise.all(
      currentUser.likes.map((likesId) => PostChema.findById(likesId))
    );
    console.log(likesPost);
    res.status(200).json(likesPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin favori postlarını getirir
router.get("/favorite/:username", async (req, res) => {
  try {
    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
    const favoritesPost = await Promise.all(
      currentUser.favorites.map((favoritesId) =>
        PostChema.findById(favoritesId)
      )
    );
    res.status(200).json(favoritesPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//id ye göre post günceller
router.put("/:id", async (req, res) => {
  if (!(await PostChema.findById(req.params.id))) {
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
  if (!(await PostChema.findById(req.params.id))) {
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
