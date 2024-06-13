const express = require("express");
const router = express.Router();
const HahstagChema = require("../models/Hashtag");

//create a new hashtag
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newHashtag =await new HahstagChema(data);
    await newHashtag.save();
    res.status(201).json(newHashtag);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//get all hashtags
router.get("/", async (req, res) => {
  try {
    const hashtags = await HahstagChema.find();
    res.status(200).json(hashtags);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});


//get hashtag by name
router.get("/:name", async (req, res) => {
  try {
    const hashtag = await HahstagChema.findOne({ name: req.params.name });
    res.status(200).json(hashtag);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
}
);

module.exports = router;
