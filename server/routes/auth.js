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
    const userHastags = await UserChema.findById(user._id).populate(
      "hashtags",
      ["name"]
    );

    const hashtagNames = await userHastags.hashtags.map((hashtag) => {
      return hashtag.name;
    });

    const userData = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      hashtags: hashtagNames,
    };

    const payload = {
      sub: user._id,
      username: user.username,
      rol: user.rol,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      issuer: "idea.com",
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    res.cookie("auth_token", token, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      session: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

// Kullanıcı çıkışı Logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json("Çıkış başarılı");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

// Kullanıcı şifre değiştirme
router.post("/changePassword/:id", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await UserChema.findById(req.params.id);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Eski şifreniz hatalı");
    }
    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();
    res.status(200).json("Şifre başarıyla değiştirildi");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
