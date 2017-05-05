const expect = require('chai').expect;
const topTweet = require('../top-tweet');

describe('Statistics', () => {
    describe('Top Tweet', () => {
        describe('#sumPts()', () => {
            it('should return 5 when the tweet has 2 favorite and 3 retweet', () => {
                let tweet = {
                    retweet_count: 3,
                    favorite_count: 2
                };
                expect(5).to.equal(topTweet.sumPts(tweet));
            });
        });
        describe('#isTweet()', () => {
            it('should return true when the tweet is a retweet', () => {
                let tweet = {
                    retweet_status: {
                        text: 'raw'
                    }
                };
                expect(true).to.equal(topTweet.isTweet(tweet));
            });
        });
        describe('#finalRank()', () => {
            it('should return [{id:54,pts:5},{id:25,pts:5},{id:47,pts:4}] when the limit is 3 and list of tweet is [{id:38, pts:3},{id:47, pts:4},{id:54, pts:5},{id:11, pts:2},{id:25, pts:5}]', () => {
                let listTweets = [
                    {id: 38, pts: 3},
                    {id: 47, pts: 4},
                    {id: 54, pts: 5},
                    {id: 11, pts: 2},
                    {id: 25, pts: 5},
                ];

                let expected = [
                    {id: 54, pts: 5},
                    {id: 25, pts: 5},
                    {id: 47, pts: 4},
                ];
                expect(expected).to.deep.equal(topTweet.finalRank(listTweets, 3));
            });
        });
    });
});