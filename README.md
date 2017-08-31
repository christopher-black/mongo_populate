# Mongoose Populate
**populate** is a Mongoose function that will replace a schema \_id with the corresponding object.

[Documentation](http://mongoosejs.com/docs/populate.html)

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var QuoteSchema = new Schema({
  quoteText: String,
  quoteAuthor: String
});

var UserSchema = new Schema({
  name: String,
  favorites: [{type: Schema.ObjectId, ref: 'Quotes'}]
});

var Users = mongoose.model('Users', UserSchema);
var Quotes = mongoose.model('Quotes', QuoteSchema);

/**
 * Get all of the users favorite quotes. You would want to replace
 * 'Demo' with the currently logged in user found by id.
 */
router.get('/favorite', function(req, res){
  // .populate() will replace ObjectId's with the matching quote
  Users.findOne({name: 'Demo'}).limit(20).populate('favorites').exec(function(err, foundUser) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(foundUser);
    }
  });
});
```

**Find with populate:**

```
{
   "_id":"599d9d3ad34fb6006e2839b1",
   "name":"Demo",
   "__v":20,
   "favorites":[
      {
         "_id":"599d9d3ad34fb6006e283a2c",
         "quoteText":"If you cannot be silent be brilliant and thoughtful.",
         "quoteAuthor":"Byron Pulsifer"
      },
      {
         "_id":"599d9d3ad34fb6006e2839bb",
         "quoteText":"Self-complacency is fatal to progress.",
         "quoteAuthor":"Margaret Sangster"
      },
      {
         "_id":"599d9d3ad34fb6006e2839c4",
         "quoteText":"To lead people walk behind them.",
         "quoteAuthor":"Lao Tzu"
      }
   ]
}
```

**Find without populate:**

```
{
   "_id":"599d9d3ad34fb6006e2839b1",
   "name":"Demo",
   "__v":20,
   "favorites":[
      "599d9d3ad34fb6006e283a2c",
      "599d9d3ad34fb6006e283a30",
      "599d9d3ad34fb6006e2839bb",
      "599d9d3ad34fb6006e2839c4"
   ]
}
```
