const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//middleware for this route only
router.use(function timeLog(req, res, next) {
  console.log(req.body);
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

module.exports = router;
