const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require("sequelize");
const { verifyToken, modOnly } = require("./auth");

const router = express.Router();
const JWT_SECRET = 'jwt_secret_123';

const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const userExists = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });

  if (userExists) {
    return res.status(400).json({ msg: 'Username or Email already in use.' });
  }

  await User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    moderator: false,
  });

  res.status(200).json({msg: 'Account created successfully!'});
};

const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({ 
    where: { 
      [Op.or]: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ] 
    } 
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ msg: 'Wrong password or username/email' });
  }
  if (user.banned) {
    return res.status(401).json({ msg: 'This user is banned!' });
  }

  const token = 'Bearer: ' + jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ username: user.username, email : user.email, token, mod: user.moderator});
};

const banUser = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ msg: 'User not found.' });
  }

  user.banned = true;
  await user.save();

  res.status(200).json({ msg: 'User has been banned successfully.' });
};


router.post('/ban', verifyToken, modOnly,banUser);
router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;
