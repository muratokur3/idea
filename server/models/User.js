const mongoose = require("mongoose");

const UserChema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
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
    },
    avatar: {
      type: String,
      default:"https://i.pravatar.cc",
    },
    background: {
      type: String,
      default: "https://picsum.photos/1024/500?random=1",
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    socialAdress: {
      github: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },

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
    hashtags: [{
      type: mongoose.Schema.Types.ObjectId,ref: "Hashtag"
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
