const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
});

const projectSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerName: { type: String, required: true },
  name: { type: String, required: true },
  members: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
    },
  ],
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["dropped", "in progress", "done"],
    default: "in progress",
  },
  started: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: String,
});

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignees: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
    },
  ],
  status: {
    type: String,
    enum: ["dropped", "in progress", "done"],
    default: "in progress",
  },
  comments: [commentSchema],
  started: {
    type: Date,
    default: Date.now,
  },
});

const inviteSchema = new mongoose.Schema({
  sender: { type:String, required:true, },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  projectName:{
    type:String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);
const Task = mongoose.model("Task", taskSchema);
const Invite = mongoose.model("Invite", inviteSchema);

module.exports = { User, Project, Task, Invite };
