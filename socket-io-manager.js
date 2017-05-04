const http = require('http');
const config = require('./config');
const serviceBus = require('servicebus');
const topTweet = require('./topTweet');
const logger = require('./logger');


logger.info('create server');
const app = http.createServer();
const io = require('socket.io').listen(app);

io.set('origins', '*:*');

let listTweets = [];

// app.listen(80);
// io.on('connection', function (socket) {

// });

io.on('connection', (socket) => {
    logger.info('socket open');
    let bus = serviceBus.bus({
        url: config.RABBITMQ_URL
    });
    bus.subscribe('tweet', (elem) => {
        logger.debug('get new tweet '+elem.tweet.id);
        topTweet.getTopTweet(socket,elem.tweet, listTweets);
    });
});