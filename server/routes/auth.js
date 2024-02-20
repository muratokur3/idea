const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserChema = require("../models/User");
const jwt = require("jsonwebtoken");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

//yeni kullanıcı oluşturur
router.post("/register", async (req, res) => {
  try {
    const { name, surname, username, email, password } = req.body;
    const existUserEmail = await UserChema.findOne({ email });
    const existUserUserName = await UserChema.findOne({ username });
    if (existUserEmail && existUserUserName) {
      return res.status(400).json("Bu email ve kullanıcı adı zaten kayıtlı");
    } else if (existUserEmail) {
      return res.status(400).json("Bu email zaten kayıtlı");
    } else if (existUserUserName) {
      return res.status(400).json("Bu kullanıcı adı zaten alınmış");
    }
    const newUser = new UserChema({
      name,
      surname,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      avatar: generateRandomAvatar(),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

// Kullanıcı girişi Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserChema.findOne({ email });
    if (!user) {
      return res.status(401).json("Böyle bir kullanıcı bulunamadı");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user.isDeleted) {
      return res.status(401).json("Bu kullanıcının hesabı dondurulmuş");
    }

    if (!isPasswordValid) {
      return res.status(401).json("Hatalı şifre");
    }

    const payload = {
      id: user._id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      projects: user.project,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
      favorites: user.favorites,
      notifications: user.notifications,
    };
    // const token = jwt.sign(
    //   { id: user._id, username: user.username },
    //   "secret",
    //   {
    //     expiresIn: "7d",
    //   }
    // );

    return res.status(200).json(payload);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

router.post("/log", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserChema.findOne({ email });
    if (!user) {
      return res.status(401).json("Böyle bir kullanıcı bulunamadı");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user.isDeleted) {
      return res.status(401).json("Bu kullanıcının hesabı dondurulmuş");
    }

    if (!isPasswordValid) {
      return res.status(401).json("Hatalı şifre");
    }

    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, "secret");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
    });

    return res.status(200).json(payload);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
