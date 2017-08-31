var express = require('express');
var router = express.Router();

var Users = require('../models/users.js');
var Quotes = require('../models/quotes.js');

/**
 * Get all of the quotes. You would want to replace 'Demo' with
 * the currently logged in user found by id.
 */
router.get('/', function(req, res){
  // First, find a user
  Users.findOne({name: 'Demo'}).exec(function(err, foundUser) {
    console.log('Found user');
    if(err) {
      res.sendStatus(500);
    } else {
      // Store an array of id's from quotes the user has stared
      var userFavorites = foundUser.favorites;

      // Limit to 20 results
      // Lean returns a mutable object - allows us to add the isFav property
      // Execute the query
      Quotes.find().limit(20).lean().exec(function(err, foundQuotes) {
        if(err) {
          res.sendStatus(500);
        } else {
          // Compare each of the found quotes to the users favorite array
          foundQuotes.forEach(function (quote) {
            // .indexOf() will return -1 if not found in the array
            quote.isFav = userFavorites.indexOf(quote._id) >= 0;
          });
          res.send(foundQuotes);
        }
      });
    }
  });
});

/**
 * Favorite a specific quote by id.
 * @param {String} id - id of the quote to add to favorites.
 */
router.put('/favorite/:id', function(req, res){
  var quoteId = req.params.id;
  console.log('PUT /favorite/:id', quoteId);

  Users.findOne({name: 'Demo'}).exec(function(err, foundUser) {
    if(err) {
      res.sendStatus(500);
    } else {
      // Add the new favorite to the database
      foundUser.favorites.push(quoteId);
      foundUser.save(function (err, savedUser) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.send(savedUser);
        }
      });
    }
  });
});

/**
 * Favorite a specific quote by id.
 * @param {String} id - id of the quote to add to favorites.
 */
router.put('/remove/:id', function(req, res){
  var quoteId = req.params.id;
  console.log('PUT /remove/:id', quoteId);
  Users.findOne({name: 'Demo'}).exec(function(err, foundUser) {
    if(err) {
      res.sendStatus(500);
    } else {
      var foundIndex = foundUser.favorites.indexOf(quoteId);
      // Add the new favorite to the database
      foundUser.favorites.splice(foundIndex, 1);
      foundUser.save(function (err, savedUser) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.send(savedUser);
        }
      });
    }
  });
});

/**
 * Get all of the users favorite quotes. You would want to replace
 * 'Demo' with the currently logged in user found by id.
 */
router.get('/favorite', function(req, res){
  // .populate() will replace ObjectId's with the matching quote
  Users.findOne({name: 'Demo'}).limit(20).exec(function(err, foundUser) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(foundUser);
    }
  });
});

module.exports = router;
