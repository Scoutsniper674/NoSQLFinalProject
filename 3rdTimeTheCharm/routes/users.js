var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())
var mongoose = require('mongoose');
var userModel = require('../models/userModel');
var {v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'add user' });
});

router.post('/add-user', function(req, res, next) {

    req.checkBody('username', 'Username is required').notEmpty() //Validate Username
    req.checkBody('type', 'A User Type is required').notEmpty()  //Validate Player type

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

      var player = req.body.type;
      if (player = "Player"){
        console.log("It detected it.")
      }
      var userDetails = new userModel({
        id: uuidv4(),
        name: req.body.username,
        player_type: req.body.type
      });

      userDetails.save((err, doc) => {
            if (!err) {
                req.flash('success', 'User added successfully!');
                res.redirect('/'); }
            else{
                console.log('Error during record insertion : ' + err);
              }
      });

    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('/', {
            title: 'Add New User',
            username: req.body.username,
            type: req.body.type
        })
    }
});


// Lsiting out the user data
router.get('/list', function(req, res, next) {
  userModel.find((err, docs) => {
    if (!err) {
      res.render("list", {
        data: docs
      });
    } else {
      console.log('Failed to Retrieve the Users List: ' + err);
    }
  });
});


module.exports = router;
