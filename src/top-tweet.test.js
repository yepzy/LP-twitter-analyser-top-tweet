const t = require('chai').assert;
const topTweet = require('./top-tweet')();
const _ = require('lodash');
const logger = require('./logger');

describe('Statistics', () => {


    describe('Top Tweet', () => {
console.log("toptweet",topTweet)
        
        const baseTweet = {
            id:666,
            text:'blablabla',
            favorite_count:15,
            retweet_count:5,
        };
        
        const baseTweetGen = {
            id: 666,
            text:'blablabla',
            nb_retweet:5, 
            pts: 20
        };
        const baseListTweets = [
                    {id: 38, pts: 3},
                    {id: 47, pts: 4},
                    {id: 54, pts: 5},
                    {id: 11, pts: 2},
                    {id: 25, pts: 5},
                    {id: 188, pts: 0},
                    {id: 87, pts: 1},
                    {id: 99, pts: 0},
                    {id: 32, pts: 2},
                    {id: 75, pts: 4},
                    {id: 66, pts: 3},
                    {id: 21, pts: 4},
                ];
                
        
        logger.debug('==========================')
        logger.debug("--- base tweet --- ");
        logger.debug(baseTweet);
        logger.debug("--- base list tweets --- ");
        logger.debug(baseListTweets);
        logger.debug('==========================')
        
        describe('#addTweetToList()', () => {
            it('should return the base list of tweets with tweet #666 in last position', () => {
                let listTweets = _.clone(baseListTweets,true);
                let expected =  _.clone(baseListTweets,true);
               expected.push(baseTweetGen);
                
                let tweet = _.clone(baseTweet,true);
                
                let res = topTweet.addTweetToList(tweet,listTweets);
                
                t.deepEqual(_.map(expected,'id'),_.map(res,'id'));
            });
        });
        describe('#getTopTweet()', () => {
            it('should return 20 when the tweet has 15 favorite and 5 retweet', () => {
                let tweet =  _.clone(baseTweet,true);
                
                t.equal(20,topTweet.sumPts(tweet));
            });
        });
        describe('#isRetweet()', () => {
            it('should return true when the tweet is a retweet', () => {
                let tweet =  _.clone(baseTweet,true);
                tweet.retweeted_status = {
                    text : 'i am retweeted'
                    };
                t.isTrue(topTweet.isRetweet(tweet));
            });
        });
        describe('#finalRank()', () => {
            it('should return tweets (#54,#25,#47,#75,#21,#38,#66,#11,#32,#87)', () => {
                let listTweets = _.clone(baseListTweets,true);

                let expected = [
                    {id: 54, pts: 5},
                    {id: 25, pts: 5},
                    {id: 21, pts: 4},
                    {id: 75, pts: 4},
                    {id: 47, pts: 4},
                    {id: 66, pts: 3},
                    {id: 38, pts: 3},
                    {id: 32, pts: 2},
                    {id: 11, pts: 2},
                    {id: 87, pts: 1},
                ];
                
                process.env['NB_MAX_TOP_TWEET'] = 10;
                
                let res = topTweet.finalRank(listTweets);
                
                t.deepEqual(_.map(expected,'id'),_.map(res,'id'));
            });
        });
        describe('#getOriginalTweet()', () => {
            it('should return tweets (#666) when it\'s retweet (#888)', () => {
                let retweet = {
                    id:888,
                    retweeted_status : baseTweet
                }
                
                t.deepEqual(baseTweetGen,topTweet.getOriginalTweet(retweet));
            });
        });
        describe('#getITweet()', () => {
            it('should return id 666 when it\'s tweet (#666)', () => {
                t.equal(baseTweet.id,topTweet.getIdTweet(baseTweet));
            });
        });
        describe('#getTextTweet()', () => {
            it('should return text "blablabla" when it\'s tweet (#666)', () => {
                t.equal(baseTweet.text,topTweet.getTextTweet(baseTweet));
            });
        });
        describe('#getNbRetweet()', () => {
            it('should return nb retweet 5 when it\'s tweet (#666)', () => {
                t.equal(baseTweet.retweet_count,topTweet.getNbRetweet(baseTweet));
            });
        });
        describe('#genObjFromTweet()', () => {
            it('should return {id: 666,text:"blablabla",nb_retweet:5,pts:20} when it\'s tweet (#666)', () => {
                t.deepEqual(baseTweetGen,topTweet.genObjFromTweet(baseTweet));
            });
        });
        describe('#genObjFromTweet()', () => {
            it('should return {id: 666,text:"blablabla",nb_retweet:5,pts:20} when it\'s tweet (#666)', () => {
                t.deepEqual(baseTweetGen,topTweet.genObjFromTweet(baseTweet));
            });
        });
        describe('#fieldMissingMsg()', () => {
            it('should return \'\' when text is missing from the tweet', () => {
                t.equal('',topTweet.fieldMissingMsg(baseTweet.id,"Content","text"));
            });
        });
        describe('#fieldMissingMsg()', () => {
            it('should return \'\' when text is missing from the tweet', () => {
                t.equal('',topTweet.fieldMissingMsg(baseTweet.id,"Content","text"));
            });
        });
        describe('#saveTweet()', () => {
            it('should return listBaseTweet with tweet (#666) when we save the tweet (#666)', () => {
                let expected =  _.clone(baseListTweets,true);
               expected.push(baseTweetGen);
                
                t.deepEqual(expected,topTweet.saveTweet(baseTweet,baseListTweets));
            });
            it('should return listBaseTweet with tweet (#666) that been retweeded by (#888) when we save the tweet (#888)', () => {
                let expected =  _.clone(baseListTweets,true);
               expected.push(baseTweetGen);
               
                let retweet = {
                    id:888,
                    retweeted_status : baseTweet
                }
                
                t.deepEqual(expected,topTweet.saveTweet(retweet,baseListTweets));
            });
        });
        
        
        
        
    
        
        
        
    });
});