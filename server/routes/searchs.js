const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");

// arama kelimesine metnine göre kullanıcılara hashtaglere  göre arama yapar
router.get("/:text", async (req, res) => {
  const searchTerm = req.params.text;
  const searchFilter = req.query.searchFilter;
  console.log(searchTerm, searchFilter);
  if (searchFilter === "all") {
    console.log("geldi");
    try {
      //bu aramaya ait birden çok kullaıcı getir
      const users = await UserChema.find({
        name: { $regex: searchTerm, $options: "i" },
      }).limit(5);
      //bu aramaya ait tüm hashtagleri getir
      const hashtags = await HashtagChema.find({
        name: { $regex: searchTerm, $options: "i" },
      }).limit(5);

      res.status(200).json({
        users,
        hashtags,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  } else {
    try {
      if (searchFilter === "users") {
        console.log("userslara geldi");
        const users = await UserChema.find({
          name: { $regex: searchTerm, $options: "i" },
        }).limit(5);

        res.status(200).json({
          users: users,
          hashtags: [],
        });
      } else if (searchFilter === "hashtags") {
        console.log("hashtagslere geldi");
        const hashtags = await HashtagChema.find({
          name: { $regex: searchTerm, $options: "i" },
        }).limit(5);
        res.status(200).json({
          users: [],
          hashtags: hashtags,
        });
      } else {
        res.status(404).json("sonuç bulunamadı");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  }
});

module.exports = router;
