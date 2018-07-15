const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('passport');
//middleware for this route only
router.use(function timeLog(req, res, next) {
  //console.log("MiddleWare");
  next();
});

//@route GET api/users/register
//@desc Test users route
//@access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: "",
        password: req.body.password
      });
      //Save the new user data
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

//@route GET api/users/login
//@desc Login User / Return JWT
//@access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find User By Email
  User.findOne({ email }).then(user => {
    //Check For User
    console.log(user);
    if (user == null) {
      return res.status(404).json({ email: "User not found" });
    }
    //Check Password
    if (password == user.password) {
      //return res.json({ message: "Success" });
      //Create Payload
      const payload = { id: user.id, name: user.name };
      //Sign The Token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 120 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      return res.status(400).json({ password: "Incorrect Password" });
    }
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
