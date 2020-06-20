const TweetService = require('./tweetService');
const tweetUtil = require('./tweetUtil.js');
const dotenv = require('dotenv');
dotenv.config();
const redisExpireSeconds = process.env.TWIT_TEE_REDIS_EXPIRE_SECONDS;
let cache;

/**
 * Twitter search
 */

exports.searchTweet = (req, res) => {
    let userId = (req.params.userId) ? req.params.userId : '';
    let tweetId = (req.params.tweetId) ? req.params.tweetId : '';
    const cacheKey = 'tweet' + userId + tweetId;
    cache.get(cacheKey, (err, cacheResult) => {

        if (cacheResult) { // cached       
            res.json(JSON.parse(cacheResult));
        } else { // not cached            

            tweetUtil.searchTweet(userId, tweetId)
                .then(result => {
                    // cache
                    cache.setex(cacheKey, redisExpireSeconds, JSON.stringify(result))
                    res.json(result);
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                })

        }
    });
};

/**
 * Db methods
 */

exports.index = (req, res) => {
    const cacheKey = 'tweetaccount';
    cache.get(cacheKey, (err, cacheResult) => {

        if (cacheResult) { // cached       
            res.json(JSON.parse(cacheResult));
        } else { // not cached            

        TweetService.index(req, res)
            .then(result => {
                // cache
                cache.setex(cacheKey, redisExpireSeconds, JSON.stringify(result))
                res.json(result);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })

        }
    });
};

// protected
exports.create = (req, res) => {
    const cacheKey = 'tweetaccount';
    TweetService.create(req, res)
        .then(result => {
            cache.del(cacheKey, {})
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

// protected
exports.delete = (req, res) => {
    const cacheKey = 'tweetaccount';
    TweetService.delete(req, res)
        .then(result => {
            cache.del(cacheKey, {})
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.setCache = (inCache) => { cache = inCache }