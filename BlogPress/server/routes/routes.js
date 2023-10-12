const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {User,Post} = require('../schema/models')

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", (req, res) => {
  res.json({ everything: "good" });
});

module.exports = router;
