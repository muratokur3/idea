const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");
const ProjectChema = require("../models/Project");
const enrichPostsWithUserDetails = require("../utils/enrichPostsWithUserDetails.js");
const enrichProjectWithUserDetails = require("../utils/enrichProjectWithUserDetails.js");
const userControlIsFollow = require("../utils/userControlIsFollow.js");

function Has(array, value) {
  return array.includes(value);
}


// ---------------------------------USER---------------------------------

//kullanıcı adına göre kullanıcı profil bilgilerini getirir
router.get("/profile/:username", async (req, res) => {
  if (
    !(await UserChema.findOne({
      username: req.params.username,
      isActive: true,
    }))
  ) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const user = await UserChema.findOne({
      username: req.params.username,
      isActive: true,
    });
    let isFollow = false;
    if (req.user) {
      isFollow = Has(user.followers, req.user? req.user.sub:null);
    }
    let userObject = user.toObject();
    let {
      password,
      project,
      following,
      followers,
      posts,
      isdeleted,
      isfrozen,
      __v,
      ...desiredFields
    } = userObject;
    res.status(200).json({ ...desiredFields, isFollow });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıcıların kullanıcı adına göre takip ettiklerini getirir
router.get("/following/:username", async (req, res) => {
  if (
    !(await UserChema.findOne({
      username: req.params.username,
      isActive: true,
    }))
  ) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;

    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
    const users = await UserChema.find({
      _id: { $in: currentUser.following },
      isActive: true,
    })
      .limit(limit)
      .skip(startIndex)
      .lean();

    const pagination = {
      page: page + 1,
      hasMore: users.length === limit,
    };
    if (req.user) {
      res.status(200).json({
        users: await userControlIsFollow(users, req.user? req.user.sub:null),
        pagination,
      });
    } else res.status(200).json({ users, pagination });
  } catch (error) {
    allUsers;
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıcıların kullanıcı adına göre takipçilerini getirir
router.get("/followers/:username", async (req, res) => {
  if (
    !(await UserChema.findOne({
      username: req.params.username,
      isActive: true,
    }))
  ) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const page = parseInt(req.query.page);
    const limit = 3;
    const startIndex = (page - 1) * limit;

    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });

    const users = await UserChema.find({
      _id: { $in: currentUser.followers },
      isActive: true,
    })
      .limit(limit)
      .skip(startIndex)
      .lean();

    const pagination = {
      page: page + 1,
      hasMore: users.length === limit,
    };
    if (req.user) {
      res.status(200).json({
        users: await userControlIsFollow(users, req.user? req.user.sub:null),
        pagination,
      });
    } else res.status(200).json({ users, pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});



// ---------------------------------POST---------------------------------

//kullanıcının favori postlarını getirir
router.get("/posts/favorite/:username", async (req, res) => {
  try {
    const currentUser = await UserChema.findOne({
      username: req.params.username,
      isActive: true,
    });
    const page = parseInt(req.query.page);
    const limit = 3;
    const startIndex = (page - 1) * limit;

    const favoritesPost = await PostChema.find({ favorites: currentUser._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: favoritesPost.length === limit,
    };

    res.status(200).json({
      posts: await enrichPostsWithUserDetails(favoritesPost, req.user? req.user.sub:null),
      pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kişinin takip ettiği postları sayfalandırarak limit değerine göre getirir
router.get("/posts/timeline", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    let allPosts = await PostChema.find()
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      page: page + 1,
      hasMore: allPosts.length === limit,
    };
      allPosts = await enrichPostsWithUserDetails(allPosts,null);
      
    res.status(200).json({
      posts: allPosts,
      pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//keşfet sayfası için en çok beğenilen ve oluşturma tarihine göre postları getirir
router.get("/posts/explore", async (req, res) => {
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

    res.status(200).json({
      posts: await enrichPostsWithUserDetails(allPosts, req.user? req.user.sub:null),
      pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//hashtag e göre postları getirir
router.get("/posts/explore/hashtag", async (req, res) => {
  if (!(await HashtagChema.findOne({ name: req.query.hashtagname }))) {
    return res.status(404).json("Hashtag bulunamadı");
  }
  try {
    const hashtag = req.query.hashtagname;
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

    res.status(200).json({
      posts: await enrichPostsWithUserDetails(hashtagPosts, req.user? req.user.sub:null),
      pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//userId den postları getirir(profile)
router.get("/posts/profile/:username", async (req, res) => {
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
    res.status(200).json({
      posts: await enrichPostsWithUserDetails(userPosts, req.user? req.user.sub:null),
      pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});





// ---------------------------------EXPLORE---------------------------------

//post id değerine göre postu getirir
router.get("/explore/singlepost/:id", async (req, res) => {
  try {
    const post = await PostChema.findById(req.params.id);
    res
      .status(200)
      .json(await enrichPostsWithUserDetails([post], req.user? req.user.sub:null));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//explore sayfası için 5 adet en çok postCount sayısı olan hashtagleri getirir
router.get("/hashtags/explore", async (req, res) => {
  try {
    const hashtags = await HashtagChema.find().sort({ postCount: -1 }).limit(5);
    res.status(200).json(hashtags);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//post id değerine göre projeyi getirir
router.get("/explore/singleproject/:id", async (req, res) => {
  try {
    const project = await ProjectChema.findById(req.params.id);
    res.status(200).json(await enrichProjectWithUserDetails([project]));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıc id değerine göre projeleri getirir
router.get("/projects/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const currentUser = await UserChema.findOne({ username: username });
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;

    const projects = await ProjectChema.find({ userId: currentUser._id })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const pagination = {
      page: page + 1,
      hasMore: projects.length < limit ? false : true,
    };
    res.status(200).json({
      projects: await enrichProjectWithUserDetails(projects, username),
      pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
