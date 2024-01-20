const jwt = require('jsonwebtoken');
const { User, Posts } = require('../models');


//change this to .env process var
const JWT_SECRET = 'jwt_secret_123';

function verifyToken(req, res, next) {
    console.log(req.header('auth-token'))
    const token = req.header('auth-token').split(' ')[1];
    if (!token) return res.status(401).send('Access Denied, Code 00');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;

        const userid = verified.uid;
        const user = User.findByPk(userid)
        if (user.banned == 1){
          return res.status(401).send('User is banned, please contact an Admin!');
        }
        req.userid = userid

        return next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}

// Middleware to check if the post is from the user or if the user is a mod
async function authorAndMod(req, res, next) {
  const token = req.header('auth-token').split(' ')[1];
  if (!token) return res.status(401).send('Error 401: Access Denied, Code 10');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userid = payload.uid;
    const user = await User.findByPk(userid);
    if (!user) return res.status(401).send('Error 401: Access Denied, Code 20');
    if (req.params.postId) {
      const postId = req.params.postId;
      const post = await Posts.findOne({ where: { id: postId } });
      if (post.UserId !== userid && !user.moderator) {
        return res.status(401).send('Error 401: Access Denied, Code 30');
      }
    }
    next();
  } catch (err) {
    res.status(401).send('Error 401: Access Denied Code 41: ' + err);
  }
}

// Middleware to check if the author is the user
async function authorOnly(req, res, next) {
  const token = req.header('auth-token').split(' ')[1];
  if (!token) return res.status(401).send('Error 401: Access Denied, Code 10');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userid = payload.uid;
    const user = await User.findByPk(userid);
    if (!user) return res.status(401).send('Error 401: Access Denied, Code 20');
    if (req.params.postId) {
      const postId = req.params.postId;
      const post = await Posts.findOne({ where: { id: postId } });
      if (post.UserId !== userid) {
        return res.status(401).send('Error 401: Access Denied, Code 30');
      }
    }
    next();
  } catch (err) {
    res.status(401).send('Error 401: Access Denied Code 41: ' + err);
  }
}

// Middleware to check if the user is a mod
async function modOnly(req, res, next) {
  const token = req.header('auth-token').split(' ')[1];
  if (!token) return res.status(401).send('Error 401: Access Denied, Code 10');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userid = payload.uid;
    const user = await User.findByPk(userid);
    if (!user || !user.moderator) return res.status(401).send('Error 401: Access Denied, Code 30 ' + user.moderator);
    next();
  } catch (err) {
    res.status(401).send('Error 401: Access Denied Code 41: ' + err);
  }
}

module.exports = { authorAndMod, authorOnly, modOnly, verifyToken, };

