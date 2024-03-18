const express = require("express");
const router = express.Router();
const PostChema = require("../models/Post");
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");
const ProjectChema = require("../models/Project");

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

  // Tüm hashtag detaylarını al
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

const concatProjectDetails = async (projects,username) => {
  const userIds = projects.map((project) => project.userId);
  const userDetails = await UserChema.find({
    _id: { $in: userIds },
  });

    // Benzersiz hashtag ID'lerini topla
    const hashtagIds = projects.reduce((acc, project) => {
      if (project.hashtags.length > 0) {
        acc.push(...project.hashtags.map((hashtag) => hashtag.toString()));
      }
      return acc;
    }, []);

    // Tüm hashtag detaylarını al
  const hashtagDetails = await HashtagChema.find({
    _id: { $in: hashtagIds },
  });

  // Projeleri detayları ile birleştir
  const projectUser = projects.map((project) => {
    const hashtags = hashtagDetails
    .filter((hashtag) => project.hashtags.includes(hashtag._id.toString()))
    .map((hashtag) => hashtag.name);
    
    return {
      ...project._doc,
      username: username,
      hashtagsName: hashtags,
    };
  });
  return projectUser;
}

//kişinin takip ettiği postları sayfalandırarak limit değerine göre getirir
router.get("/posts/timeline", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const allPosts = await PostChema.find()
      .sort({ createdAt: 1 })
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

//kullanıcı adına göre kullanıcı getirir
router.get("/:username", async (req, res) => {
  if (!(await UserChema.findOne({ username: req.params.username }))) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const user = await UserChema.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//kullanıcıların kullanıcı adına göre takip ettiklerini getirir
router.get("/following/:username", async (req, res) => {
  if (!(await UserChema.findOne({ username: req.params.username }))) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
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
  if (!(await UserChema.findOne({ username: req.params.username }))) {
    return res.status(404).json("Kullanıcı bulunamadı");
  }
  try {
    const currentUser = await UserChema.findOne({
      username: req.params.username,
    });
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

    res
      .status(200)
      .json({ posts: await concatPostDetails(allPosts), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//hashtag e göre postları getirir
router.get("/posts/explore/hashtag", async (req, res) => {
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

//post id değerine göre postu getirir
router.get("/explore/singlepost/:id", async (req, res) => {
  try {
    const post = await PostChema.findById(req.params.id);
    res.status(200).json(await concatPostDetails([post]));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//post id değerine göre projeyi getirir
router.get("/explore/singleproject/:id", async (req, res) => {
  try {
    const project = await ProjectChema.findById(req.params.id);
    res.status(200).json(
      await concatProjectDetails([project])
    );
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
    res
      .status(200)
      .json({ posts: await concatPostDetails(userPosts), pagination });
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
    res.status(200).json({ projects:await concatProjectDetails(projects,username), pagination });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
