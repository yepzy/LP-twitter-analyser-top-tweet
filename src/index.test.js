const t = require('chai').assert;
const index = require('./index');
const _ = require('lodash');

describe('Statistics', () => {
    describe('index', () => {
        describe('#classementHasChanged()', () => {
            it('should return true when the classement has changed', () => {
                
                const listTweets = [
                    {id: 666, pts: 22},
                    {id: 54, pts: 5},
                    {id: 25, pts: 5},
                    {id: 47, pts: 4},
                    {id: 75, pts: 4},
                    {id: 21, pts: 4},
                    {id: 38, pts: 3},
                    {id: 66, pts: 3},
                    {id: 11, pts: 2},
                    {id: 32, pts: 2},
                ];
                
                const finalList = [
                    {id: 666, pts: 22},
                    {id: 54, pts: 5},
                    {id: 25, pts: 5},
                    {id: 47, pts: 4},
                    {id: 75, pts: 4},
                    {id: 21, pts: 4},
                    {id: 38, pts: 3},
                    {id: 66, pts: 3},
                    {id: 32, pts: 3}, // changement
                    {id: 11, pts: 2},
                ];
                
                let res = index.classementHasChanged(listTweets, finalList);
                
                t.isTrue(res);
            });
        });
    });
});