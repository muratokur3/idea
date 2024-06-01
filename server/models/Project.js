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
    createDate: {
      type:String,
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
