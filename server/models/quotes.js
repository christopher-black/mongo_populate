var mongoose = require('mongoose');
var Schema = mongoose.Schema

var QuoteSchema = new Schema({
  quoteText: String,
  quoteAuthor: String
});

module.exports = mongoose.model('Quotes', QuoteSchema);
