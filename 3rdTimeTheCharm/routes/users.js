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

/*
Attempting to Query Data that is.... Man What the heck.
// Pull query Data from MongoDB
router.get('/viewall', function(req, res) {
  userModel.find({}, function(err, users) {
    console.log("\nUsers !");
    console.log(users);
    renderResult(res, users, "User List from MongoDB :");
  });
});

function renderResult (res, users, msg) {
  res.render('display.ejs', {message:msg, users:users},
    function(err, result) {
      if (!err) {res.end(result);}
      else {res.end('Oops ! An error occured.');
        console.log(err);}
    });
}
*/

module.exports = router;
