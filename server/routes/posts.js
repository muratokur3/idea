const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");

//post içindeki userId değerinden user detaylarını alır ve birleştirir
const concatPostDetails = async (posts) => {
  // Benzersiz kullanıcı ID'lerini topla
  const userIds = posts.map((post) => post.userId);

  // Tek bir sorgu ile tüm kullanıcı detaylarını al
  const userDetails = await UserChema.find({
    _id: { $in: userIds },
  });

  // Benzersiz hashtag ID'lerini topla
  const hashtagIds = posts.reduce((acc, post) => {
    if (post.hashtags.length > 0) {
      acc.push(...post.hashtags.map((hashtag) => hashtag.toString()));
    }
    return acc;
  }, []);

  // Tek bir sorgu ile tüm hashtag detaylarını al
  const hashtagDetails = await HashtagChema.find({
    _id: { $in: hashtagIds },
  });

  // Postları kullanıcı detayları ile birleştir
  const postUser = posts.map((post) => {
    const hashtags = hashtagDetails
      .filter((hashtag) => post.hashtags.includes(hashtag._id.toString()))
      .map((hashtag) => hashtag.name);
    const user = userDetails.find(
      (user) => post.userId.toString() === user._id.toString()
    );
    return {
      ...post._doc,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar,
      username: user.username,
      hashtagsName: hashtags,
    };
  });
  return postUser;
};

//yeni post oluşturur
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPost = new PostChema(data);
    //hashtag postCount arttırma
    newPost.hashtags.map(async (hashtag) => {
      await HashtagChema.findByIdAndUpdate(hashtag, { $inc: { postCount: 1 } });
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//çoklu post oluşturur
// router.post("/createMany", async (req, res) => {
//   try {
//     const posts = req.body;
//     posts.forEach(async (post) => {
//       const newPost = new PostChema(post);
//       newPost.hashtags.map(async (hashtag) => {
//         await HashtagChema.findByIdAndUpdate(
//          hashtag,
//          { $inc: { postCount: 1 } },
//        );
//      }
//      );
//       await newPost.save();
//     });
//     res.status(201).json(posts);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("Server Error");
//   }
// });

//tüm postları getirir
router.get("/", async (req, res) => {
  try {
    const posts = await PostChema.find();
    res.status(200).json(await concatPostDetails(posts));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin takip ettiği postları sayfalandırarak limit değerine göre getirir
router.get("/timeline/:userId", async (req, res) => {
  try {
    // const currentUser = await UserChema.findById(req.params.userId);
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const allPosts = await PostChema
      .find
      //   {
      //   userId: { $in: currentUser.following },
      // }
      ()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    console.log(page);
    const pagination = {
      page: page + 1,
      hasMore: allPosts.length === limit,
    };
    res
      .status(200)
      .json({ posts: await concatPostDetails(allPosts), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin takip ettiği hashtaglerin postlarını getirir
router.get("/privateMe/:userId", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    // const currentUser = await UserChema.findById(req.params.userId);
    const hashtagPosts = await PostChema
      .find
      //   {
      //   hashtags: { $in: currentUser.hashtags },
      // }
      ()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    console.log(page);

    const pagination = {
      page: page + 1,
      hasMore: hashtagPosts.length === limit,
    };

    res
      .status(200)
      .json({ posts: await concatPostDetails(hashtagPosts), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//keşfet sayfası için en çok beğenilen ve oluşturma tarihine göre postları getirir
router.get("/explore", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;

    const allPosts = await PostChema.find()
      .sort({ likesCount: -1, createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: allPosts.length === limit,
    };

    res
      .status(200)
      .json({ posts: await concatPostDetails(allPosts), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//hashtag e göre postları getirir
router.get("/explore/hashtag", async (req, res) => {
  try {
    const hashtag = req.query.hashtagname;
    console.log(hashtag);
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const currentHashtag = await HashtagChema.findOne({ name: hashtag });
    const hashtagPosts = await PostChema.find({
      hashtags: { $in: currentHashtag._id },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: hashtagPosts.length === limit,
    };

    res
      .status(200)
      .json({ posts: await concatPostDetails(hashtagPosts), pagination });
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
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;

    const favoritesPost = await PostChema.find({ favorites: currentUser._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: favoritesPost.length === limit,
    };

    res
      .status(200)
      .json({ posts: await concatPostDetails(favoritesPost), pagination });
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
    res.status(200).json(await concatPostDetails(post));
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
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const userPosts = await PostChema.find({ userId: currentUser._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: userPosts.length === limit,
    };
    res
      .status(200)
      .json({ posts: await concatPostDetails(userPosts), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin beğendiği postları getirir
router.get("/likes/:username", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const likesPost = await PostChema.find({ likes: currentUser._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    const pagination = {
      page: page + 1,
      hasMore: likesPost.length === limit,
    };
    res
      .status(200)
      .json({ posts: await concatPostDetails(likesPost), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//postId ve userId değerine göre beğeni ekler
router.post("/like/:postId/:userId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await PostChema.findById(postId);

    // Kullanıcının zaten beğendiği kontrol ediliyor
    if (post.likes.find((userID) => userID === userId)) {
      return res.status(403).json("Bu postu zaten beğendiniz");
    }

    // likes dizisine yeni kullanıcı ekleniyor
    await post.updateOne({ $push: { likes: userId } });

    // likesCount değeri artırılıyor
    await post.updateOne({ $inc: { likesCount: 1 } });

    res.status(200).json("Postu beğendiniz");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//posstId ve userId değerine göre beğeni siler
router.post("/unlike/:postId/:userId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await PostChema.findById(postId);

    // Kullanıcının zaten beğendiği kontrol ediliyor
    // if (!post.likes.find((userID) => userID === userId)) {
    //   return res.status(403).json("Bu postu zaten beğenmediniz");
    // }

    // likes dizisine kullanıcı siliniyor
    await post.updateOne({ $pull: { likes: userId } });

    // likesCount değeri azaltılıyor
    await post.updateOne({ $inc: { likesCount: -1 } });

    res.status(200).json("Postu beğenisini kaldırdınız");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//postId ve userId değerine göre favori ekler
router.post("/favorites/:postId/:userId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await PostChema.findById(postId);

    // Kullanıcının zaten favoriye eklediği kontrol ediliyor
    // if (post.favorites.find((userID) => userID === userId)) {
    //   return res.status(403).json("Bu postu zaten favoriye eklediniz");
    // }

    // favorites dizisine yeni kullanıcı ekleniyor
    await post.updateOne({ $push: { favorites: userId } });

    res.status(200).json("Postu favoriye eklediniz");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//posstId ve userId değerine göre favori siler
router.post("/unfavorites/:postId/:userId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await PostChema.findById(postId);

    // Kullanıcının zaten favoriye eklediği kontrol ediliyor
    // if (!post.favorites.find((userID) => userID === userId)) {
    //   return res.status(403).json("Bu postu zaten favoriye eklediniz");
    // }

    // favorites dizisine kullanıcı siliniyor
    await post.updateOne({ $pull: { favorites: userId } });

    res.status(200).json("Postu favorilerinizden kaldırdınız");
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

//tüm postlara ... alanı ekler
router.post("/yenialan", async (req, res) => {
  try {
    const posts = await PostChema.find();
    posts.map(async (post) => {
      await post.updateOne({ $set: { yenialan: [] } });
    });
    res.status(200).json("Tüm postlara ... alanı eklendi");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
