const mongoose = require("mongoose");

const UserChema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    avatar: {
      type: String,
      default:"https://i.pravatar.cc",
    },
    bio: {
      type: String,
      default: "",
      max: 500,
    },
    projects: [{
      type: mongoose.Schema.Types.ObjectId,ref: "Project"
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,ref: "User"
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,ref: "User"
    }],
    posts: [{
      type: mongoose.Schema.Types.ObjectId,ref: "Post"
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,ref: "Post"
    }],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,ref: "Post"
    }],
    notifications: {
      type: Array,
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserChema);
module.exports = User;