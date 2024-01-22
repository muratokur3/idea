const express = require("express");
const router = express.Router();

const authRoute = require("./auth.js");
const UserRoute = require("./users.js");
const postRoute = require("./posts.js");
const hashtagRoute= require("./hashtags.js");
const ProjectRoute= require("./projects.js");


router.use("/auth", authRoute);
router.use("/users", UserRoute);
router.use("/posts", postRoute);
router.use("/hashtags", hashtagRoute);
router.use("/projects", ProjectRoute);


module.exports = router;