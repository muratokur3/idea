const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");
const bcrypt = require("bcryptjs");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

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

//kullanıcıyı takip etmiyorsa takip eder etmişse takibi bırakır
router.put("/follow", async (req, res) => {
  if (req.body.followerId === req.body.followingId) {
    return res.status(403).json("Kendini takip edemezsin");
  }
  try {
    const currentUser = await UserChema.findById(req.body.followerId);
    const user = await UserChema.findById(req.body.followingId);
    if (!currentUser.following.includes(req.body.followingId)) {
      await currentUser.updateOne({ $push: { following: req.body.followingId } });
      await user.updateOne({ $push: { followers: req.body.followerId } });
      res.status(200).json("Kullanıcıyı takip ediyorsunuz");
    } else {
      await currentUser.updateOne({ $pull: { following: req.body.followingId } });
      await user.updateOne({ $pull: { followers: req.body.followerId } });
      res.status(200).json("Kullanıcıyı takip etmiyorsunuz");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıcı idlerini döner
// router.get("/ids", async (req, res) => {
//   try {
//     const users = await UserChema.find();
//     const ids =await users.map((user) => user._id);
//     res.status(200).json(ids);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("Server Error");
//   }
// });

//birden çok kullanıcı oluştur
router.post("/createMany", async (req, res) => {
  try {
    const users = req.body;
   
    users.forEach(async (user) => {
      const { name, surname, username, email, password } = user;
      const newUser = new UserChema({
        name,
        surname,
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        avatar: generateRandomAvatar(),
      });
      await newUser.save();
     });
    
    res.status(201).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

