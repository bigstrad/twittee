// Initialize express router
const router = require('express').Router();
const connectDb = require('./modules/util/dbUtil');
const cache = require('./modules/util/cacheUtil');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'up',
        message: 'Welcome to twit-tee API!',
    });
});

// Controllers
let tweetController = require('./modules/tweet/tweetController');
let productController = require('./modules/product/productController');

// Initialize Caches
tweetController.setCache(cache);
productController.setCache(cache);

// Routes
router.route(['/twit/account'])
    .get(tweetController.index)
    .post(tweetController.create)
    .delete(tweetController.delete);

router.route(['/twit/:userId/:tweetId', '/twit/:userId'])
    .get(tweetController.searchTweet);

router.route(['/product/color'])
    .get(productController.indexColor)
    .post(productController.createColor)
    .delete(productController.deleteColor);

router.route(['/product/size'])
    .get(productController.indexSize)
    .post(productController.createSize)
    .delete(productController.deleteSize);

// Export API routes
module.exports = router;