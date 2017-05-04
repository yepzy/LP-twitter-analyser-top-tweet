//________________________________________________________ SOCKET IO _____________________________



var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io');
io.listen(server);
app.listen(80);
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// app.listen(80);
// io.on('connection', function (socket) {
 
// });

const config = require('./config');
const bus = require('servicebus').bus({
    url: config.RABBITMQ_URL
});

bus.subscribe('tweet', function (elem) {
  call_ma_fonction(elem.tweet);
});






var liste_des_tweets = [];

// const redis = require("redis"),
//     client = redis.createClient();

var calculer_nombre_de_points = function (tweet) {
    return 1;
}
var get_text_tweet = function (tweet) {
    if (typeof tweet.text !== 'undefined') {
        return tweet.text;
    } else {
        return 'Aucun champ text ...';
    }
}
var get_nb_retweet = function (tweet) {
    if (typeof tweet.retweet_count !== 'undefined') {
        return tweet.retweet_count;
    } else {
        return 'Aucun champ nb de retweet ...';
    }
}
var get_id_tweet = function (tweet) {
    if (typeof tweet.id_str !== 'undefined') {
        return tweet.id_str;
    } else {
        return 'Aucun champ id tweet ...';
    }
}
var est_un_retweet = function(tweet) {
    if (typeof tweet.retweeted_status !== 'undefined') {
        if (typeof tweet.retweeted_status !== 'null') {
            return true;   
        }
    }
    return false;
}

var get_tweet_original = function(tweet) {
    if (typeof tweet.retweeted_status !== 'undefined') {
        if (typeof tweet.retweeted_status !== 'null') {
            return {'text_tweet':tweet.retweeted_status.text,'nb_retweet':tweet.retweeted_status.retweet_count,'id_tweet':tweet.retweeted_status.id_str,'nb_points':1};
        }
    }
    return null;
}

var voir_informations_tweet = function(tweet_from_redis) {
    console.log({nb_retweet:tweet_from_redis.nb_retweet, id:tweet_from_redis.id_tweet,pts:tweet_from_redis.nb_points});
}
var enregister_tweet = function(tweet) {
    // console.log('-> Enregistrement dans la base Redis du tweet : '+get_id_tweet(tweet)+" ...");
    //  client.set("id_"+get_id_tweet(tweet),JSON.stringify({'text_tweet':get_text_tweet(tweet),'nb_retweet':get_nb_retweet(tweet),'id_tweet':get_id_tweet(tweet),'nb_points':calculer_nombre_de_points(tweet)}));  
    if(est_un_retweet(tweet)){
        liste_des_tweets.push(get_tweet_original(tweet));
    }
    liste_des_tweets.push({'text_tweet':get_text_tweet(tweet),'nb_retweet':get_nb_retweet(tweet),'id_tweet':get_id_tweet(tweet),'nb_points':calculer_nombre_de_points(tweet)});
}

var recuperer_liste_des_tweets_depuis_redis = function () {
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
    return liste_des_tweets;

    
}

var voir_classement_final = function(liste_des_tweets_redis,limit) {
    liste_des_tweets_redis.sort(function(a, b){
        var scoreA = a.nb_points,
            scoreB = b.nb_points;
        if(scoreA > scoreB) return -1;
        if(scoreA < scoreB) return 1;
        return 0;
    });
    console.log("Voici le classement final des tweets :");
    if(limit>liste_des_tweets_redis.length){
        limit = liste_des_tweets_redis.length;
    }
    for(var i=0;i<limit;i++){
        console.log('-= Numero '+ (i+1) + '=-');
        voir_informations_tweet(liste_des_tweets_redis[i]);
    }
}


var call_ma_fonction = function(tweet) {
    enregister_tweet(tweet);


voir_classement_final(recuperer_liste_des_tweets_depuis_redis(),10);
}
