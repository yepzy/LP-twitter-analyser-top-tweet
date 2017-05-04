var util = require('util'),
    twitter = require('twitter');
var twit = new twitter();
var params = {screen_name: 'nodejs'};
twit.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else {
      console.log(error);
  }
});
https://twitter.com/login?redirect_after_login=https%3A/apps.twitter.com/