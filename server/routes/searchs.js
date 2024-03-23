const express = require("express");
const router = express.Router();
const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");

// arama kelimesine metnine göre kullanıcılara hashtaglere  göre arama yapar
router.get("/:text", async (req, res) => {
  const searchTerm = req.params.text;
  const searchFilter = req.query.searchFilter;

  if (searchFilter === "users") {
    try {
      //bu aramaya ait kullanıcıları getir
      const users = await UserChema.find({
        name: { $regex: searchTerm, $options: "i" },
      }).limit(5);

      res.status(200).json({ users });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  } 
  
  if (searchFilter === "hashtags") {
    try {
      const hashtags = await HashtagChema.find({
        name: { $regex: searchTerm, $options: "i" },
      }).limit(5);
      
      res.status(200).json({ hashtags });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  }

});

module.exports = router;
