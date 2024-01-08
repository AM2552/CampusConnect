const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const verifyToken = require("./auth");

router.get("/:threadId", async (req, res) => {
  const threadId = req.params.threadId;
  const posts = await Posts.findAll({ where: { ThreadId: threadId } });
  res.json(posts);
});

router.post("/", verifyToken, async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
