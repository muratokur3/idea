const express = require("express");
const router = express.Router();
const HahstagChema = require("../models/Hashtag");

//yeni Hahtag oluşturur
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

//tüm hashtagleri getirir
router.get("/", async (req, res) => {
  try {
    const hashtags = await HahstagChema.find();
    res.status(200).json(hashtags);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});



//tüm hashtag idlerini ve name leridöner
// router.get("/", async (req, res) => {
//   try {
//     const hashtags = await HahstagChema.find();
//     const ids =await hashtags.map((hashtag) => ({_id:hashtag._id,name:hashtag.name}));
//     res.status(200).json(ids);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("Server Error");
//   }
// });

//birden çok hashtag oluştur
router.post("/createMany", async (req, res) => {
  try {
    const hashtags = req.body;
    hashtags.forEach(async (hashtag) => {
      const newHashtag =await new HahstagChema(hashtag);
      await newHashtag.save();
     });
    res.status(201).json(hashtags);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//adına göre hashtag getirir
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
