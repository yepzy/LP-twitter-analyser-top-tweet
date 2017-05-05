const _ = require('lodash');
const config = require('./config');
const redisManager = require('./redis-manager');
const logger = require('./logger');

const getTopTweet = (socket, tweet, listTweets) => {
    logger.info('getTopTweet ' + getIdTweet(tweet));
    listTweets = saveTweet(tweet, listTweets);
    socket.emit('classement', redisManager.getRedisListTweets(listTweets));
};

/**
 *
 * @param tweet
 * @returns {number}
 */
const sumPts = (tweet) => {
    logger.info('sumPts ' + getIdTweet(tweet));
    return tweet.favorite_count + tweet.retweet_count;
};

/**
 *
 * @param id
 * @param label
 * @param field
 * @returns {string}
 */
const fieldMissingMsg = (id, label, field) => {
    logger.warn('ERROR => tweet ' + id + ' -> ' + label + '<' + field + '>' + ' not found');
    return null;
};

/**
 *
 * @param tweet
 * @returns {number}
 */
const getIdTweet = (tweet) => {
    logger.info('getIdTweet ' + getIdTweet(tweet));
    return _.isUndefined(tweet.id) ? fieldMissingMsg(getIdTweet(tweet), 'identifiant', 'id') : tweet.id;
};

/**
 *
 * @param tweet
 * @returns {string}
 */
const getTextTweet = (tweet) => {
    logger.info('getTextTweet ' + getIdTweet(tweet));
    return _.isUndefined(tweet.text) ? fieldMissingMsg(getIdTweet(tweet), 'content', 'text') : tweet.text;
};

/**
 *
 * @param tweet
 * @returns {number}
 */
const getNbRetweet = (tweet) => {
    logger.info('getNbRetweet ' + getIdTweet(tweet));
    return _.isUndefined(tweet.retweet_count) ? fieldMissingMsg(getIdTweet(tweet), 'retweet number', 'retweet_count') : tweet.retweet_count;
};

/**
 *
 * @param tweet
 * @returns {*}
 */
const isTweet = (tweet) => {
    logger.info('isTweet ' + getIdTweet(tweet));
    let originalTweet = tweet.retweeted_status;
    return (_.isUndefined(originalTweet) || _.isNull(originalTweet));
};

/**
 *
 * @param tweet
 * @returns {*}
 */
const getOriginalTweet = (tweet) => {
    logger.info('getOriginalTweet ' + getIdTweet(tweet));
    let originalTweet = tweet.retweeted_status;
    return _.isUndefined(originalTweet) || _.isNull(originalTweet) ? null : genObjFromTweet(originalTweet);
};

/**
 *
 * @param tweet
 * @param listTweets
 */
const saveTweet = function (tweet, listTweets) {
    logger.info('saveTweet ' + getIdTweet(tweet));
    //redisManager.addTweet(tweet);
    if (isTweet(tweet)) {
        listTweets.push(getOriginalTweet(tweet));
    }
    listTweets.push(genObjFromTweet(tweet));
};

/**
 *
 * @param listTweets
 * @returns {*|ArrayBuffer|string|Array.<T>|Blob}
 */
const finalRank = function (listTweets) {
    logger.info('finalRank');
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
    logger.info('genObjFromTweet ' + getIdTweet(tweet));
    return {
        'id': getIdTweet(tweet),
        'text': getTextTweet(tweet),
        'nb_retweet': getNbRetweet(tweet),
        'pts': sumPts(tweet)
    };
};

module.exports = {
    sumPts,
    finalRank,
    isTweet,
    getTopTweet,
};