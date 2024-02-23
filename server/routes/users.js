const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images/avatars");
  },
  filename: (req, file, cb) => {
    const directoryPath = "./uploads/images/avatars"; // Dosya dizini
    const username = req.query.username;

    // Dosyanın varlığını kontrol et
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
        if (fileName === username) {
          // Dosya varsa sil
          fs.unlink(path.join(directoryPath, existingFile), (err) => {
            if (err) {
              console.error("Dosya silinirken bir hata oluştu:", err);
              cb(err);
              return;
            }
            cb(null, `${username}.${file.originalname.split(".").pop()}`);
          });
        } else {
          // Dosya yoksa dosya adını kullanarak devam et
          cb(null, `${username}.${file.originalname.split(".").pop()}`);
        }
      });
    });
  },
});

const storageBackground = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images/backgrounds");
  },
  filename: (req, file, cb) => {
    const directoryPath = "./uploads/images/backgrounds"; // Dosya dizini
    const username = req.query.username;

    // Dosyanın varlığını kontrol et
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
        if (fileName === username) {
          // Dosya varsa sil
          fs.unlink(path.join(directoryPath, existingFile), (err) => {
            if (err) {
              console.error("Dosya silinirken bir hata oluştu:", err);
              cb(err);
              return;
            }
            cb(null, `${username}.${file.originalname.split(".").pop()}`);
          });
        } else {
          // Dosya yoksa dosya adını kullanarak devam et
          cb(null, `${username}.${file.originalname.split(".").pop()}`);
        }
      });
    });
  },
});

const uploadAvatar = multer({storage:storageAvatar });
const uploadBackground = multer({ storage:storageBackground });

//kullanıcı avatarını günceller
router.post("/upload/avatars", uploadAvatar.single("file"), async (req, res) => {
  console.log(req.query.username);
  if (!req.file) {
   res.status(404).json("Dosya yüklenemedi");
  }
  else{
  res.status(200).json(req.file);
  }
});

// kullanıcı arkaplan resmini günceller
router.post("/upload/backgrounds", uploadBackground.single("file"), async (req, res) => {
  console.log(req.query.username);
  if (!req.file) {
   res.status(404).json("Dosya yüklenemedi");
  }
  else{
  res.status(200).json(req.file);
  }
});

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

//gelen kullanıcı bilgilerine göre kullanıcıyı günceller
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


//kullanıcı id'sine göre kullanıcı getirir
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


//kullanıcıyı takip etmiyorsa takip eder
router.put("/follow/:followerId/:followingId", async (req, res) => {
  const { followerId, followingId } = req.params;
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

//kullanıcıyı takip ediyorsa takip etmeyi bırakır
router.put("/unfollow/:followerId/:followingId", async (req, res) => {
  const { followerId, followingId } = req.params;
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
