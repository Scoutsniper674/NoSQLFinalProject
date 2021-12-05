var mongoose = require('mongoose');
var db = require("../database");

// create an schema
var userSchema = new mongoose.Schema({
  id: String,
  name: String,
  player_type: String,
  avatar: String,
  wallet: String
});

var userModel = mongoose.model('User', userSchema,'user');

module.exports = userModel;
