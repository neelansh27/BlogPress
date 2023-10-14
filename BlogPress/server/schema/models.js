const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: Buffer,
});

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: String,
});

const postSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  author:String,
  title: { type: String, required: true },
  content: String,
  comments:[commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", userSchema);
const Posts = mongoose.model("Post", postSchema);
module.exports = { User, Posts };
