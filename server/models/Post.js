const mongoose = require("mongoose");

const PostChema = mongoose.Schema(
  {
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    hashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Posts = mongoose.model("Post", PostChema);
module.exports = Posts;
