'use strict';

const _ = require('lodash');
const config = require('./config');
const logger = require('./logger');

module.exports = () => {
    
/**
 * 
 * @param tweet
 * @param listTweets
 * @returns {array}
 */
const addTweetToList = (tweet, listTweets) => {
    logger.debug('getTopTweet ' + getIdTweet(tweet));
    listTweets = saveTweet(tweet, listTweets);
    return listTweets;
};



/**
 *
 * @param tweet
 * @returns {number}
 */
const sumPts = (tweet) => {
    logger.debug('sumPts ' + getIdTweet(tweet));
    return tweet.favorite_count + tweet.retweet_count;
};

/**
 *
 * @param id
 * @param label
 * @param field
 */
const fieldMissingMsg = (id, label, field) => {
    logger.warn('ERROR => tweet ' + id + ' -> ' + label + '<' + field + '>' + ' not found');
    return '';
};

/**
 *
 * @param tweet
 * @returns {number}
 */
const getIdTweet = (tweet) => {
    logger.debug('getIdTweet ');
    return _.isUndefined(tweet.id) ? fieldMissingMsg(null, 'identifiant', 'id') : tweet.id;
};

/**
 *
 * @param tweet
 * @returns {string}
 */
const getTextTweet = (tweet) => {
    logger.debug('getTextTweet ' + getIdTweet(tweet));
    return _.isUndefined(tweet.text) ? fieldMissingMsg(getIdTweet(tweet), 'content', 'text') : tweet.text;
};

/**
 *
 * @param tweet
 * @returns {number}
 */
const getNbRetweet = (tweet) => {
    logger.debug('getNbRetweet ' + getIdTweet(tweet));
    return _.isUndefined(tweet.retweet_count) ? fieldMissingMsg(getIdTweet(tweet), 'retweet number', 'retweet_count') : tweet.retweet_count;
};

/**
 *
 * @param tweet
 * @returns {*}
 */
const isRetweet = (tweet) => {
    logger.debug('isRetweet ' + getIdTweet(tweet));
    let originalTweet = tweet.retweeted_status;
    return (!_.isUndefined(originalTweet) && !_.isNull(originalTweet));
};

/**
 *
 * @param tweet
 * @returns {*}
 */
const getOriginalTweet = (tweet) => {
    logger.debug('getOriginalTweet ' + getIdTweet(tweet));
    let originalTweet = tweet.retweeted_status;
    return _.isUndefined(originalTweet) || _.isNull(originalTweet) ? null : genObjFromTweet(originalTweet);
};

/**
 *
 * @param tweet
 * @param listTweets
 */
const saveTweet = function (tweet, listTweets) {
    logger.debug('saveTweet ' + getIdTweet(tweet));
    if (isRetweet(tweet)) {
        listTweets.push(getOriginalTweet(tweet));
    }else {
        listTweets.push(genObjFromTweet(tweet));
    }
    return listTweets;
};

/**
 *
 * @param listTweets
 * @returns {*|ArrayBuffer|string|Array.<T>|Blob}
 */
const finalRank = function (listTweets) {
    logger.debug('finalRank');
    listTweets.sort(function (a, b) {
        if (a.pts > b.pts) return -1;
        if (a.pts < b.pts) return 1;
        return 0;
    });

    listTweets = listTweets.slice(0, config.NB_MAX_TOP_TWEET);

    return listTweets;
};

/**
 *
 * @param tweet
 * @returns {{id: number, text: string, nb_retweet: number, pts: number}}
 */
const genObjFromTweet = (tweet) => {
    logger.debug('genObjFromTweet ' + getIdTweet(tweet));
    return {
        'id': getIdTweet(tweet),
        'text': getTextTweet(tweet),
        'nb_retweet': getNbRetweet(tweet),
        'pts': sumPts(tweet)
    };
};

return {
    addTweetToList,
    sumPts,
    fieldMissingMsg,
    getIdTweet,
    getTextTweet,
    getNbRetweet,
    isRetweet,
    getOriginalTweet,
    finalRank,
    genObjFromTweet,
    saveTweet
}

};