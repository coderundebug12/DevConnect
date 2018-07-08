const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("users", UserSchema);

//To Craete New User From Mongose Model
//let newUser = new User({name: req.body.name,email: req.body.email,avatar,password: req.body.password})
//newUser.save().then(user => res.json(user)).catch(err => console.log(err));
