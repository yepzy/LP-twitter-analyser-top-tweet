const logger = require('./logger');

const redisManager = {

// const redis = require("redis"),
//     client = redis.createClient();

    getRedisListTweets: (listTweets) => {
        // var array = [];
        // client.keys("id_*", function(e, keys){
        //     keys.forEach(function (key) {
        //         if(e)console.log(e);
        //         client.get(key, function (err, tweet_string) {
        //             var tweet = JSON.parse(tweet_string);
        //             array.push(tweet);
        //             console.log('Taille : ' + array.length);
        //         });
        //     });
        // });

        // console.log('Taille : ' + array.length);
        // return array;
        return listTweets;

    },

    addTweet: () => {
        //  client.set("id_"+getIdTweet(tweet),JSON.stringify({'text':getTextTweet(tweet),'nb_retweet':getNbRetweet(tweet),'id':getIdTweet(tweet),'pts':sumPts(tweet)}));
    }

};

module.exports = redisManager;