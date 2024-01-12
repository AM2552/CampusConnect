const express = require("express");
const { Posts, User } = require("../models");
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

  const newPost = await Posts.create(post);
  post.id = newPost.id;
  post.username = await User.findByPk(req.userid);

  res.json(post);
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const threadId = req.params.threadId;
  
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

  const post = await Posts.findOne({ where: { id: postId, ThreadId: threadId } });

  if (!post) {
    return res.status(404).send(`Post not found ${postId}/${threadId}`);
  }

  await Posts.update(updatedPost, { where: { id: postId, ThreadId: threadId } });
  res.json(post);
};

router.put("/:threadId/:postId", verifyToken, editPost, editPost);
router.get("/:threadId", getPosts);
router.post("/", verifyToken, createPost);
router.delete("/:threadId/:postId", verifyToken, deletePost, deletePost);

module.exports = router;
