require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, Posts } = require("../schema/models");
const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/jwt.middleware");

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((entry) => {
    if (entry) {
      res.status(400).json({ message: "user already exists" });
      return;
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then(() => {
        console.log("Added " + newUser._id);
        return res.json({ message: `Added new user ${newUser.username}` });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ message: err });
      });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ $and: [{ email: email }, { password: password }] }).then(
    (entry) => {
      if (!entry) {
        return res.status(400).json({ message: "Please Check Credentials" });
      }
      const payload ={
        name: entry.username,
        email: entry.email,
        id: entry._id,
      };
      const token = jwt.sign(payload,process.env.SECRET,{
        algorithm: "HS256",
        expiresIn: "1h",
      });
      return res.json({ token: token});
    }
  );
});

// Using user Id to add posts
router.post("/post/add", (req, res) => {
  User.findById(req.body.uid)
    .then((entry) => {
      const newPost = new Posts({
        author_id: entry._id,
        author: entry.username,
        title: req.body.title,
        content: req.body.content,
      });
      newPost
        .save()
        .then(() => {
          res.json({
            post_id: newPost._id,
            Status: "Added Successfully",
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => res.json(err));
});

router.post("/login", (req, res) => {
  res.send(req.body);
});
router.get("/post/getposts", (req, res) => {
  Posts.find(
    { title: { $regex: req.query.search || "", $options: "i" } },
    "-author_id -__v"
  )
    .sort({ createdAt: -1 })
    .skip(6 * (req.query.page - 1 || 0))
    .limit(6)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/post/user/:id", (req, res) => {
  Posts.find({author_id: req.params.id},"-author_id -__v")
    .sort({ createdAt: -1 })
    .skip(6 * (req.query.page - 1 || 0))
    .limit(6)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/post/get/:id", (req, res) => {
  Posts.findById(req.params.id, "-author_id -__v")
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

// Using post Id to add comments
router.post("/comment/add", (req, res) => {
  Posts.findById(req.body.pid)
    .then((entry) => {
      const comment = {
        author: req.body.author,
        content: req.body.content,
      };
      entry.comments.push(comment);
      entry
        .save()
        .then((post) => {
          res.json(post);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

router.get("/verify",isAuthenticated,(req,res)=>{
  res.status(200).json(req.user);
})
module.exports = router;
