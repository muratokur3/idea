const mongoose = require("mongoose");

const PostChema = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
  ,
  hashtags: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{timestamps: true}
);
const Posts=mongoose.model("Post", PostChema)
module.exports = Posts;
