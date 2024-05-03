const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query.folder;
    cb(null, `./uploads/images/${folder}`);
  },
  filename: async (req, file, cb) => {
    const newFilename = req.query.filename; // kaydedilecek dosay adını query parametresinden alın
    const directoryPath = `./uploads/images/${req.query.folder}`;
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Dosya dizini okunurken bir hata oluştu:", err);
        cb(err);
        return;
      }
      // Dosya dizinindeki her dosya için kontrol yap
      files.some((existingFile) => {
        // Dosya isminin uzantısız kısmını al ve aranan dosya ismiyle karşılaştır
        const fileName = existingFile.split(".")[0];
        if (fileName === newFilename) {
          // Dosya varsa sil
          fs.unlink(path.join(directoryPath, existingFile), (err) => {
            if (err) {
              console.error("Dosya silinirken bir hata oluştu:", err);
              cb(err);
              return;
            }
          });
        }
      });
    });

    cb(null, `${newFilename}.${file.originalname.split(".")[1]}`); // Yeni dosya adını oluşturun (uzantısız)
  },
});

// Multer ile dosya yükleme işlemi için middleware oluşturun
const upload = multer({ storage: storage });

// "/upload/avatars" endpoint'i için POST isteği işleyicisi
router.post("/upload/images", upload.single("file"), async (req, res) => {
  const file = req.file; // Gelen dosya

  // Gelen dosya yoksa hata döndür
  if (!file) {
    return res.status(400).json({ error: "Dosya yüklenemedi" });
  }

  try {
    // Dosya başarıyla yüklendiyse başarılı yanıtı döndür
    res.status(200).json({
      filename: file.filename,
      message: "Dosya başarıyla yüklendi",
    });
  } catch (error) {
    // Dosya yükleme sırasında bir hata oluştuğunda hata yanıtı döndür
    console.error("Dosya yükleme sırasında bir hata oluştu:", error);
    res.status(500).json({ error: "Dosya yüklenemedi" });
  }
});

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

//ubdate user
router.put("/ubdateUser/:id", async (req, res) => {
  try {
    const user = await UserChema.findById(req.params.id);
    if (user.username === req.body.username) {
      await UserChema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }).exec();
      res.status(200).json("Kullanıcı güncellendi");
    } else {
      if (
        await UserChema.findOne({
          username: req.body.username,
        })
      ) {
        return res.status(403).json("Kullanıcı adı zaten kullanılıyor");
      }
      await UserChema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }).exec();
      res.status(200).json("Kullanıcı güncellendi");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserChema.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//get single user by id
router.get("/id/:id", async (req, res) => {
  if (!(await UserChema.findById(req.params.id))) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const user = await UserChema.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//follow a user
router.put("/follow/:followingId", async (req, res) => {
  const { followingId } = req.params;
  const followerId = req.user.sub;
  if (followerId === followingId) {
    return res.status(403).json("Kendini takip edemezsin");
  }
  try {
    const currentUser = await UserChema.findById(followerId).exec();
    const user = await UserChema.findById(followingId).exec();
    if (!currentUser.following.includes(followingId)) {
      await UserChema.findByIdAndUpdate(currentUser._id, {
        $push: { following: followingId },
      });
      await UserChema.findByIdAndUpdate(user._id, {
        $push: { followers: followerId },
      });

      res.status(200).json("Kullanıcıyı takip edildi");
    } else {
      res.status(403).json("Kullanıcıyı zaten takip ediyorsunuz");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//unfollow a user
router.put("/unfollow/:followingId", async (req, res) => {
  const { followingId } = req.params;
  const followerId = req.user.sub;
  if (followerId === followingId) {
    return res.status(403).json("Kendini takip edemezsin");
  }
  try {
    const currentUser = await UserChema.findById(followerId).exec();
    const user = await UserChema.findById(followingId).exec();

    if (currentUser.following.includes(followingId)) {
      await UserChema.findByIdAndUpdate(currentUser._id, {
        $pull: { following: followingId },
      });
      await UserChema.findByIdAndUpdate(user._id, {
        $pull: { followers: followerId },
      });
      res.status(200).json("Kullanıcıyı takipi bırakıldı");
    } else {
      res.status(403).json("Kullanıcıyı zaten takip etmiyorsunuz");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//follow a hashtag
router.put("/followHashtag/:userId/:hashtagname", async (req, res) => {
  const { userId, hashtagname } = req.params;
  const hashtag = await HashtagChema.findOne({
    name: hashtagname,
  });
  const hashtagId = await hashtag._id;
  try {
    const user = await UserChema.findById(userId).exec();
    if (!user.hashtags.includes(hashtagId)) {
      await UserChema.findByIdAndUpdate(userId, {
        $push: { hashtags: hashtagId },
      });
      res.status(200).json("Hashtag takip edildi");
    } else {
      res.status(403).json("Hashtag zaten takip ediliyor");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//unfollow a hashtag
router.put("/unfollowHashtag/:userId/:hashtagname", async (req, res) => {
  const { userId, hashtagname } = req.params;
  try {
    const hashtag = await HashtagChema.findOne({
      name: hashtagname,
    });
    const hashtagId = await hashtag._id;
    const user = await UserChema.findById(userId).exec();
    if (user.hashtags.includes(hashtagId)) {
      await UserChema.findByIdAndUpdate(userId, {
        $pull: { hashtags: hashtagId },
      });
      res.status(200).json("Hashtag takip bırakıldı");
    } else {
      res.status(403).json("Hashtag zaten takip edilmiyor");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//create many users
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

//user delete
router.put("/account/delete/:id", async (req, res) => {
  try {
    await UserChema.findByIdAndUpdate(req.params.id, {
      $set: { isDeleted: true, isActive: false},
    }).exec();
    res.status(200).json("Kullanıcı silindi");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//user freeze
router.put("/account/freeze/:id", async (req, res) => {
  try {
    await UserChema.findByIdAndUpdate(req.params.id, {
      $set: { isFrozen: true, isActive: false },
    }).exec();
    res.status(200).json("Kullanıcı donduruldu");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//user active
router.put("/account/activate/:id", async (req, res) => {
  try {
    await UserChema.findByIdAndUpdate(req.params.id, {
      $set: { isFrozen: false, isActive: true },
    }).exec();

    res.status(200).json("Kullanıcı aktif edildi");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
