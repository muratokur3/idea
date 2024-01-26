const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");

//tüm kullanıcıları getirir
router.get("/", async (req, res) => {
  try {
    const users = await UserChema.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıcı adına göre kullanıcı getirir
router.get("/:username", async (req, res) => {
  if (!await UserChema.findOne({username:req.params.username})) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const user = await UserChema.findOne({username:req.params.username});
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıcıların kullanıcı adına göre takip ettiklerini getirir
router.get("/following/:username", async (req, res) => {
  if (!await UserChema.findOne({username:req.params.username})) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const currentUser = await UserChema.findOne({username:req.params.username});
    const users = await Promise.all(
      currentUser.following.map((userId) => {
        return UserChema.findById(userId);
      })
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
    
  }
});

//kullanıcıların kullanıcı adına göre takipçilerini getirir
router.get("/followers/:username", async (req, res) => {
  if (!await UserChema.findOne({username:req.params.username})) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const currentUser = await UserChema.findOne({username:req.params.username});
    const users = await Promise.all(
      currentUser.followers.map((userId) => {
        return UserChema.findById(userId);
      })
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
    
  }
});


module.exports = router;
