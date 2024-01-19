const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");



//yeni kullanıcı oluşturur
router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new UserChema(data);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
//tüm kullanıcıları getirir
// router.get("/", async (req, res) => {
//   try {
//     const users = await UserChema.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("Server Error");
//   }
// });
//id ye göre kullanıcı getirir
// router.get("/:id", async (req, res) => {
//   if (!await UserChema.findById(req.params.id)) {
//     return res.status(404).json("Post not found");
//   }
//   try {
//     const postId = req.params.id;
//     const post = await UserChema.findById(postId);
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("Server Error");
//   }
// });
//id ye göre kullanıcıyı günceller
// router.put("/:id", async (req, res) => {
//   if (!await UserChema.findById(req.params.id)) {
//     return res.status(404).send("Post not found");
//   }
//   const postId = req.params.id;
//   const updates = req.body;
//   try {
//     const ubdadetPost = await UserChema.findByIdAndUpdate(postId, updates, {
//       new: true,
//     });
//     res.status(200).json(ubdadetPost);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server Error");
//   }
// });

//id ye göre kullanıcıyı siler
// router.delete("/:id", async (req, res) => {
//   if (!await UserChema.findById(req.params.id)) {
//     return res.status(404).json("Post not found");
//   }
//   try {
//     const postId = req.params.id;
//     const post = await UserChema.findByIdAndDelete(postId);
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
