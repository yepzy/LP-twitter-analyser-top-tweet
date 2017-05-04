const util = require('util')

var tweet   = 
{
      "text": "RT @PostGradProblem: In preparation for the NFL lockout, I will be spending twice as much time analyzing my fantasy baseball team during ...", 
      "truncated": true, 
      "in_reply_to_user_id": null, 
      "in_reply_to_status_id": null, 
      "favorited": false, 
      "source": "<a href=\"http://twitter.com/\" rel=\"nofollow\">Twitter for iPhone</a>", 
      "in_reply_to_screen_name": null, 
      "in_reply_to_status_id_str": null, 
      "id_str": "54691802283900928", 
      "entities": {
            "user_mentions": [
                  {
                        "indices": [
                              3, 
                              19
                        ], 
                        "screen_name": "PostGradProblem", 
                        "id_str": "271572434", 
                        "name": "PostGradProblems", 
                        "id": 271572434
                  }
            ], 
            "urls": [ ], 
            "hashtags": [ ]
      }, 
      "contributors": null, 
      "retweeted": false, 
      "in_reply_to_user_id_str": null, 
      "place": null, 
      "retweet_count": 4, 
      "created_at": "Sun Apr 03 23:48:36 +0000 2011", 
      "retweeted_status": {
            "text": "In preparation for the NFL lockout, I will be spending twice as much time analyzing my fantasy baseball team during company time. #PGP", 
            "truncated": false, 
            "in_reply_to_user_id": null, 
            "in_reply_to_status_id": null, 
            "favorited": false, 
            "source": "<a href=\"http://www.hootsuite.com\" rel=\"nofollow\">HootSuite</a>", 
            "in_reply_to_screen_name": null, 
            "in_reply_to_status_id_str": null, 
            "id_str": "54640519019642881", 
            "entities": {
                  "user_mentions": [ ], 
                  "urls": [ ], 
                  "hashtags": [
                        {
                              "text": "PGP", 
                              "indices": [
                                    130, 
                                    134
                              ]
                        }
                  ]
            }, 
            "contributors": null, 
            "retweeted": false, 
            "in_reply_to_user_id_str": null, 
            "place": null, 
            "retweet_count": 4, 
            "created_at": "Sun Apr 03 20:24:49 +0000 2011", 
            "user": {
                  "notifications": null, 
                  "profile_use_background_image": true, 
                  "statuses_count": 31, 
                  "profile_background_color": "C0DEED", 
                  "followers_count": 3066, 
                  "profile_image_url": "http://a2.twimg.com/profile_images/1285770264/PGP_normal.jpg", 
                  "listed_count": 6, 
                  "profile_background_image_url": "http://a3.twimg.com/a/1301071706/images/themes/theme1/bg.png", 
                  "description": "", 
                  "screen_name": "PostGradProblem", 
                  "default_profile": true, 
                  "verified": false, 
                  "time_zone": null, 
                  "profile_text_color": "333333", 
                  "is_translator": false, 
                  "profile_sidebar_fill_color": "DDEEF6", 
                  "location": "", 
                  "id_str": "271572434", 
                  "default_profile_image": false, 
                  "profile_background_tile": false, 
                  "lang": "en", 
                  "friends_count": 21, 
                  "protected": false, 
                  "favourites_count": 0, 
                  "created_at": "Thu Mar 24 19:45:44 +0000 2011", 
                  "profile_link_color": "0084B4", 
                  "name": "PostGradProblems", 
                  "show_all_inline_media": false, 
                  "follow_request_sent": null, 
                  "geo_enabled": false, 
                  "profile_sidebar_border_color": "C0DEED", 
                  "url": null, 
                  "id": 271572434, 
                  "contributors_enabled": false, 
                  "following": null, 
                  "utc_offset": null
            }, 
            "id": 54640519019642880, 
            "coordinates": null, 
            "geo": null
      }, 
      "user": {
            "notifications": null, 
            "profile_use_background_image": true, 
            "statuses_count": 351, 
            "profile_background_color": "C0DEED", 
            "followers_count": 48, 
            "profile_image_url": "http://a1.twimg.com/profile_images/455128973/gCsVUnofNqqyd6tdOGevROvko1_500_normal.jpg", 
            "listed_count": 0, 
            "profile_background_image_url": "http://a3.twimg.com/a/1300479984/images/themes/theme1/bg.png", 
            "description": "watcha doin in my waters?", 
            "screen_name": "OldGREG85", 
            "default_profile": true, 
            "verified": false, 
            "time_zone": "Hawaii", 
            "profile_text_color": "333333", 
            "is_translator": false, 
            "profile_sidebar_fill_color": "DDEEF6", 
            "location": "Texas", 
            "id_str": "80177619", 
            "default_profile_image": false, 
            "profile_background_tile": false, 
            "lang": "en", 
            "friends_count": 81, 
            "protected": false, 
            "favourites_count": 0, 
            "created_at": "Tue Oct 06 01:13:17 +0000 2009", 
            "profile_link_color": "0084B4", 
            "name": "GG", 
            "show_all_inline_media": false, 
            "follow_request_sent": null, 
            "geo_enabled": false, 
            "profile_sidebar_border_color": "C0DEED", 
            "url": null, 
            "id": 80177619, 
            "contributors_enabled": false, 
            "following": null, 
            "utc_offset": -36000
      }, 
      "id": 54691802283900930, 
      "coordinates": null, 
      "geo": null
};

var liste_des_tweets = [];

// const redis = require("redis"),
//     client = redis.createClient();

var calculer_nombre_de_points = function (tweet) {
    
    var nb_points;
    var date_du_tweet = new Date(tweet.created_at);
    console.log("----------------------------------------------"+date_du_tweet);
    nb_points = tweet.favorite_count + tweet.retweet_count;
    return nb_points;
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
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    console.log('---->');
    console.log('---->    Text du tweet : ' + tweet_from_redis.text_tweet);
    console.log('---->    Nb de retweet : ' + tweet_from_redis.nb_retweet);
    console.log('---->    Id du tweet : ' + tweet_from_redis.id_tweet);
    console.log('---->    Nombre de points du tweet : ' + tweet_from_redis.nb_points);
    console.log('----');
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
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

enregister_tweet(tweet);


voir_classement_final(recuperer_liste_des_tweets_depuis_redis(),10);

var bus = require('servicebus').bus();
bus.listen('tweet', function (event) {
console.log(event.tweet.text);
});