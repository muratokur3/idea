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
    projects: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    favorites: {
      type: Array,
      default: [],
    },
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
