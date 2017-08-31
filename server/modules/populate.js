var Users = require('../models/users.js');
var Quotes = require('../models/quotes.js');

var quotes_data = require('./quotes.js');

// [
//    { 'quote' : 'I\'m not going to school just for the academics - I wanted to share ideas, to be around people who are passionate about learning.', 'author' : 'Emma Watson' },
//    { 'quote' : 'Remember there\'s no such thing as a small act of kindness. Every act creates a ripple with no logical end.', 'author' : 'Scott Adams' },
//    { 'quote' : 'Intelligence plus character-that is the goal of true education.', 'author' : 'Martin Luther King, Jr.' }
// ];


function run() {
  console.log('Populate starting...')
  Users.find({name: 'Demo'}, function(err, user){
    if (err) {

    } else {
      console.log('Found user' + user.length);
      if(user.length === 0) {
        console.log('Populating the database with dummy data');
        // No users, lets add some dummy data
        var user = new Users({ name: 'Demo' });
        user.save(function (err, fluffy) {
          if (err) return console.error(err);
        });

        Quotes.collection.insertMany(quotes_data, function(err, result) {
          if (err) return console.error(err);
        })
      }
    }
  });
}


module.exports = run;
