// Configure the app by creating a controller
demoApp.controller('QuoteController', function($http){
  var vc = this;
  vc.quotes = [];
  function getQuotes() {
    $http.get('/quotes').then(function(response){
      vc.quotes = response.data;
    }).catch(function(err){
      console.log('Something went wrong.');
    });
  }
  getQuotes();

  vc.addFavorite = function(quoteId) {
    $http.put('/quotes/favorite/' + quoteId).then(function(response){
      getQuotes();
    }).catch(function(err){
      console.log('Something went wrong.');
    });
  }

  vc.removeFavorite = function(quoteId) {
    $http.put('/quotes/remove/' + quoteId).then(function(response){
      getQuotes();
    }).catch(function(err){
      console.log('Something went wrong.');
    });
  }
});
