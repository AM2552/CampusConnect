const jwt = require('jsonwebtoken');
const { User, Posts } = require('../models');


//change this to .env process var
const JWT_SECRET = 'jwt_secret_123';

function verifyToken(req, res, next) {
    console.log(req.header('auth-token'))
    const token = req.header('auth-token').split(' ')[1];
    if (!token) return res.status(401).send('Access Denied, Code 0');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;

        const userid = verified.uid;
        req.userid = userid

        return next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}

async function restricted(req, res, next) {
    const token = req.header('auth-token').split(' ')[1];
    const mod = req.header('authorization');
    const postId = req.params.postId; // assuming postId is a URL parameter
  
    if (!token) {
      return res.status(401).send('Access Denied, Code 1');
    }
  
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      const userid = payload.uid;
      const user = User.findByPk(userid)
      req.userid = userid

  
      if (!user) {
        return res.status(401).send('Access Denied, Code 2'); 
      }
      
      if (user.moderator == 1) {
        return next();
      }
  
      const post = await Posts.findOne({ where: { UserId: postId } });
  
      if (post.UserId !== userid) {
        return res.status(401).send('Access Denied, Code 3');
      }
  
      return next();
  
    } catch (err) {
      res.status(401).send('Access Denied Code 4: ' + err);
    }
  }

module.exports = restricted;
module.exports = verifyToken;
