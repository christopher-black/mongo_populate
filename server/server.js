var express = require('express');
var app = express();
var quotes = require('./routes/quotes.router.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json()); // needed for angular requests

app.use('/quotes', quotes);

var databaseUrl = 'mongodb://localhost:27017/populate';
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to : ', databaseUrl);
  // On successful connection, populate data if needed
  var populate = require('./modules/populate.js');
  populate();
});

mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ', err);

});

app.listen(port, function() {
  console.log('Listening on port: ', port);
});
