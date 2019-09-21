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
    cache.del('color', {})
    ProductService.createColor(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.createSize = (req, res) => {
    cache.del('size', {})
    ProductService.createSize(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.deleteColor = (req, res) => {
    cache.del('color', {})
    ProductService.deleteColor(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.deleteSize = (req, res) => {
    cache.del('size', {})
    ProductService.deleteSize(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.setCache = (inCache) => { cache = inCache }