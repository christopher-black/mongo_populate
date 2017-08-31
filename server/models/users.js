var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name: String,
  favorites: [{type: Schema.ObjectId, ref: 'Quotes'}]
});

module.exports = mongoose.model('Users', UserSchema);
