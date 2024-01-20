const mongoose = require("mongoose");

const ProjectChema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const  Projects= mongoose.model("Project", ProjectChema);
module.exports =  Projects;
