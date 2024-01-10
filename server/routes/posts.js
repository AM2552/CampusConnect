const express = require("express");
const router = express.Router();
const { Posts, User } = require("../models");
const verifyToken = require("./auth");
const restricted = require("./auth");
const getUid = require("./auth");

router.get("/:threadId", async (req, res) => {
  const threadId = req.params.threadId;
  const posts = await Posts.findAll({
    where: { ThreadId: threadId },
    include: [{
      model: User,
      as: 'user',
      attributes: ['username']
    }]
  });

  const censoredPosts = posts.map(post => {
    const plainPost = post.get({ plain: true });
    return {
      ...plainPost,
      UserId: 0,
      username: plainPost.user.username
    };
  });
  console.log(censoredPosts)
  res.json(censoredPosts);
});



router.post("/", verifyToken, async (req, res) => {
  const post = req.body;
  post.UserId = req.userid;
  const userid = req.userid;
  console.log(req.userid);

  // Capture the newly created post
  const newPost = await Posts.create(post);

  // Add the id to the post object
  post.id = newPost.id;

  post.username = await User.findByPk(userid);
  res.json(post);
});


router.delete("/:threadId/:postId", verifyToken, restricted, async (req, res) => {
  const postId = req.params.postId;
  const threadId = req.params.threadId;
  
  const post = await Posts.findOne({ where: { id: postId, ThreadId: threadId } });
  
  if (!post) {
    return res.status(404).send('Post not found' + postId + "/" + threadId);
  }

  await Posts.destroy({ where: { id: postId, ThreadId: threadId } });
  res.json({ message: "Post deleted successfully" });
});

module.exports = router;

module.exports = router;