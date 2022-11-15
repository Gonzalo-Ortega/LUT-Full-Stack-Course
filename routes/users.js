const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Fail to register user.'
      });
    } else {
      res.json({
        success: true,
        msg: 'User registered.'
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Checks if the user exists:
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found.'
      });
    }

    // Cheks if the pasword used is correct:
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({
          data: user
        }, config.secret, {
          // The user will need to login again in the specified time.
          expiresIn: 86400 // seconds
        });
        // If the password is correct the whole user data is sent.
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password.'
        });
      }
    });
  });
});

// Profile
// Gets and protects the profile route
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

module.exports = router;