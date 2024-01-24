const mongoose = require("mongoose");

const HashtagChema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  postCount: {
    type: Number,
    default: 0,
  },
});
const Hashtag = mongoose.model("Hashtag", HashtagChema);
module.exports = Hashtag;
