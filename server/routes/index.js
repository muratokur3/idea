const express = require("express");
const router = express.Router();

const authRoute = require("./auth.js");
const postRoute = require("./posts.js");
const hashtagRoute= require("./hashtags.js");

router.use("/auth", authRoute);
router.use("/posts", postRoute);
router.use("/hashtags", hashtagRoute);

module.exports = router;