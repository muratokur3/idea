const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");
const enrichPostsWithUserDetails = require("../utils/enrichPostsWithUserDetails");

//create a new post
router.post("/new", async (req, res) => {
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

//ubdate post
router.put("/ubdate/:id", async (req, res) => {
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

//delete a post
router.delete("/delete/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await PostChema.findById(postId);
    if (!post) {
        return res.status(404).json("Post not found");
    }
    try {
        // Hashtaglerin postCount değerini düşür
        for (let hashtag of post.hashtags) {
            await HashtagChema.updateOne(
                { _id: hashtag },
                { $inc: { postCount: -1 } }
            );
        }

        // Postu sil
        await PostChema.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await PostChema.find();
    res.status(200).json(await enrichPostsWithUserDetails(hashtagPosts, req.user? req.user.sub:null));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//user follow users posts
router.get("/timeline", async (req, res) => {
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

    const pagination = {
      page: page + 1,
      hasMore: allPosts.length === limit,
    };
    res
      .status(200)
      .json({ posts: await enrichPostsWithUserDetails(allPosts, req.user? req.user.sub:null), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//user follow hashtags posts
router.get("/privateMe", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    // const currentUser = await UserChema.findById(req.user.sub);
    const hashtagPosts = await PostChema
      .find
      //   {
      //   hashtags: { $in: currentUser.hashtags },
      // }
      ()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: hashtagPosts.length === limit,
    };

    res
      .status(200)
      .json({ posts: await enrichPostsWithUserDetails(hashtagPosts, req.user? req.user.sub:null), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//user favorite posts
router.get("/favorite", async (req, res) => {
  try {
    const currentUser = await UserChema.findOne({
      username: req.user.username,
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
      .json({ posts: await enrichPostsWithUserDetails(favoritesPost, req.user? req.user.sub:null), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//user add likes posts
router.get("/likes", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const currentUser = await UserChema.findOne({
      username: req.user.username,
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
      .json({ posts: await enrichPostsWithUserDetails(likesPost, req.user.sub), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//post likes
router.post("/like/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.sub;
    const post = await PostChema.findById(postId);

    // Kullanıcının zaten beğendiği kontrol ediliyor
    if (post.likes.some((id) => id.toString() === userId)) {
      return res.status(304).json("Bu postu zaten beğendiniz");
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

//post unlike
router.post("/unlike/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.sub;
    const post = await PostChema.findById(postId);

    // Kullanıcının zaten beğendiği kontrol ediliyor
    if (!post.likes.find((id) => id.toString() === userId)) {
      return res.status(304).json("Bu postu zaten beğenmediniz");
    }

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

//add favorites
router.post("/favorites/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.sub;
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

//unfavorites
router.post("/unfavorites/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.sub;
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

module.exports = router;


//crate many posts
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