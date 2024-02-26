const express = require("express");
const checkJwt = require('../middleware/auth');

const router = express.Router();

const authRoute = require("./auth.js");
const UserRoute = require("./users.js");
const postRoute = require("./posts.js");
const hashtagRoute= require("./hashtags.js");
const projectRoute= require("./projects.js");
const searchRoute= require("./searchs.js");
const qusetRoute = require("./quest.js");

router.use("/auth", authRoute);
router.use("/users", UserRoute);
router.use("/search", searchRoute);
router.use("/quest", qusetRoute);
router.use("/posts", postRoute);
router.use("/hashtags", hashtagRoute);
router.use("/projects", projectRoute);


module.exports = router;