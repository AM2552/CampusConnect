const express = require("express");
const { Posts, User, Threads } = require("../models");
const { verifyToken, authorAndMod, authorOnly, modOnly } = require("./auth");


const router = express.Router();

const getPosts = async (req, res) => {
  const threadId = req.params.threadId;
  const posts = await Posts.findAll({
    where: { ThreadId: threadId },
    include: [{ model: User, as: 'user', attributes: ['username'] }]
  });

  const censoredPosts = posts.map(post => {
    const plainPost = post.get({ plain: true });
    return { ...plainPost, UserId: 0, username: plainPost.user.username };
  });

  res.json(censoredPosts);
};

const createPost = async (req, res) => {
  const post = req.body;
  post.UserId = req.userid;
  const threadid = req.body.ThreadId

  const thread = await Threads.findOne({ where: { id: threadid, closed: false} });
  if (!thread) {
    return res.status(404).send(`Thread closed or deleted!`);
  }

  const newPost = await Posts.create(post);
  post.id = newPost.id;
  post.username = await User.findByPk(req.userid);

  res.json(post);
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const threadId = req.params.threadId;

  const thread = await Threads.findOne({ where: { id: threadId, closed: false} });
  if (!thread) {
    return res.status(404).send(`Thread closed or deleted!`);
  }

  const post = await Posts.findOne({ where: { id: postId, ThreadId: threadId } });
  
  if (!post) {
    return res.status(404).send(`Post not found ${postId}/${threadId}`);
  }

  await Posts.destroy({ where: { id: postId, ThreadId: threadId } });
  res.json({ message: "Post deleted successfully" });
};

const editPost = async (req, res) => {
  const postId = req.params.postId;
  const threadId = req.params.threadId;
  const updatedPost = req.body;

  const thread = await Threads.findOne({ where: { id: threadId, closed: false} });
  if (!thread) {
    return res.status(404).send(`Thread closed or deleted!`);
  }

  const post = await Posts.findOne({ where: { id: postId, ThreadId: threadId } });

  if (!post) {
    return res.status(404).send(`Post not found ${postId}/${threadId}`);
  }

  await Posts.update(updatedPost, { where: { id: postId, ThreadId: threadId } });
  res.json(post);
};

router.put("/:threadId/:postId", verifyToken, authorOnly, editPost);
router.get("/:threadId", getPosts);
router.post("/", verifyToken, createPost);
router.delete("/:threadId/:postId", verifyToken, authorAndMod, deletePost);

module.exports = router;
