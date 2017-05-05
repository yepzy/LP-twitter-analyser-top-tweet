const config = require('./config');
const bus = require('servicebus').bus({
    // url: config.RABBITMQ_URL
});
const retry = require('servicebus-retry');
const TwitterAPI = require('twitter');
const twitterClient = new TwitterAPI(config.twitter);

bus.use(retry({
  store: new retry.MemoryStore()
}));
 
// You can also get the stream in a callback if you prefer. 
twitterClient.stream('statuses/sample', null, function(stream) {
  stream.on('data', function(tweet) {
    bus.publish('tweet', { tweet });
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});