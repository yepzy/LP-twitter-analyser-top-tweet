const env = require('common-env')();

const config = env.getOrElseAll({
    twitter: {
        consumer_key: {
            $default: 'JICzlMMuDvjdh5yf74xnIrv39'
        },
        consumer_secret: {
            $default: 'O3WmxES0Tl9vplK5NmvdYF7Cvh6y6d633pRWfT5mM9KCyvc96a'
        },
        access_token_key: {
            $default: '619461847-LXLrvM1H6iOBmUhJzUoRhQVyWdcFuqDr5XIVIwfx'
        },
        access_token_secret: {
            $default: 't07Db3jmDF2qihhwlncMgIaj9eXMEbHzpt8kr0vdqD0zp'
        }
    },
    RABBITMQ_URL: 'amqp://sacuqjih:omOG4lRsjCl-5Rn2-slRUjuHYmSGzxRf@lark.rmq.cloudamqp.com/sacuqjih',
    NB_MAX_TOP_TWEET: 10,
    LOG_FILE: 'top_tweet.log'
});

module.exports = config;
