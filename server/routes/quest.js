const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");

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
  

//kişinin takip ettiği postları sayfalandırarak limit değerine göre getirir
router.get("/posts/timeline", async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 5;
      const startIndex = (page - 1) * limit;
      const allPosts = await PostChema
        .find
        ()
        .sort({ createdAt: 1 })
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

  module.exports = router;