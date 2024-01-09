const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require("sequelize");

// Use .env variable for secret, only for testing purpose:
const JWT_SECRET = 'jwt_secret_123';


router.get('/findall', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error 500: Internal Server Error');
  }
});

// localhost:5001/users/signup
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    

    let user = await User.findOne({ where: { username } });
    let mail = await User.findOne({ where: { email } });
    if (user || mail) {
      return res.status(400).json({ msg: 'Username or Email already in use.' });
    }
    console.log("No matching user found. creating a new one...")

    user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10), // Passwort hashen
    });

    res.status(200).json({msg: 'Account created succesfully!'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error 500: Internal Server Error');
  }
});

// localhost:5001/users/login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    let usernameOrEmail = req.body.usernameOrEmail;
    let password = req.body.password;

    let user = await User.findOne({ 
      where: { 
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ] 
      } 
    });
    if (!user) {
      return res.status(400).json({ msg: 'Wrong password or username/email' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong password or username/email' });
    }

    const token = 'Bearer: ' + jwt.sign({ username: user.username }, JWT_SECRET, { 
      expiresIn: '1h' 
    });

    res.json({ username: user.username, email : user.email, token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error 500 Internal error.');
  }
});

module.exports = router;