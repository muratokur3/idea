const express = require("express");
const router = express.Router();

const users = require("./users.js");
const posts = require("./posts.js");
const hashtags= require("./hashtags.js");

router.use("/posts", posts);
router.use("/users", users);
router.use("/hashtags", hashtags);

module.exports = router;