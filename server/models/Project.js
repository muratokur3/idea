const mongoose = require("mongoose");

const ProjectChema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    githubAdress: {
      type: String,
    },
    projectAdress: {
      type: String,
    },
    hashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    createDate: {
      type:String,
    },
    logo: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const  Projects= mongoose.model("Project", ProjectChema);
module.exports =  Projects;
