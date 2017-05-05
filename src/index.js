const top_tweet = require('./top-tweet');
const config = require('./config');

module.exports = () => {

    var listTweets = [];
    var currentClassement = false;

    const bus = require('servicebus').bus({
        url: config.RABBITMQ_URL
    });
    console.log("Starting queue ...");
    bus.subscribe(config.QUEUE_GET_CHANNEL, makeClassement(event));

    const makeClassement = (elem) => {
        console.log('Recevied new tweet !');
        top_tweet.addTweetToList(elem, listTweets);
        if (classementHasChanged(top_tweet.finalRank(listTweets), currentClassement)) {
            currentClassement = top_tweet.finalRank(listTweets);
            console.log('________________________ Classement : ____________________________');
            console.log(currentClassement);
        }
        else {
            console.log('Aucun changement !');
        }
    }



    const classementHasChanged = function(classement, currentClassement) {
        return (classement !== currentClassement);
    };

    // const classementHasChangedV2 = function(classement, currentClassement) {
    //     if(currentClassement == false){
    //         return true;
    //     }
    //     for(var i=0;i<config.NB_MAX_TOP_TWEET;i++){
    //         if(classement[i].id !== currentClassement[i].id) {
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    return = {
        makeClassement,
        classementHasChanged,
        // classementHasChangedV2
    };

};
