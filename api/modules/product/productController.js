const ProductService = require('./productService');
const dotenv = require('dotenv');
dotenv.config();
const redisExpireSeconds = process.env.TWIT_TEE_REDIS_EXPIRE_SECONDS;
let cache;

/**
 * Db methods
 */

exports.indexColor = (req, res) => {
    const cacheKey = 'color';
    cache.get(cacheKey, (err, cacheResult) => {

        if (cacheResult) { // cached       
            res.json(JSON.parse(cacheResult));
        } else { // not cached 

            ProductService.indexColor(req, res)
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

exports.indexSize = (req, res) => {
    const cacheKey = 'size';
    cache.get(cacheKey, (err, cacheResult) => {

        if (cacheResult) { // cached       
            res.json(JSON.parse(cacheResult));
        } else { // not cached 

            ProductService.indexSize(req, res)
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

exports.createColor = (req, res) => {
    const cacheKey = 'color';
    ProductService.createColor(req, res)
        .then(result => {
            cache.del(cacheKey, {})
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.createSize = (req, res) => {
    const cacheKey = 'size';
    ProductService.createSize(req, res)
        .then(result => {
            cache.del(cacheKey, {})
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.deleteColor = (req, res) => {
    const cacheKey = 'color';
    ProductService.deleteColor(req, res)
        .then(result => {
            cache.del(cacheKey, {})
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.deleteSize = (req, res) => {
    const cacheKey = 'size';
    ProductService.deleteSize(req, res)
        .then(result => {
            cache.del(cacheKey, {})
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.setCache = (inCache) => { cache = inCache }