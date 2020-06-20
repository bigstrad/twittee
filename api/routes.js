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

// Middleware
const validateToken = require('./modules/util/validateToken');

// Controllers
const tweetController = require('./modules/tweet/tweetController');
const productController = require('./modules/product/productController');
const paymentController = require('./modules/payment/paymentController');
const loginController = require('./modules/login/loginController');

// Initialize Caches
tweetController.setCache(cache);
productController.setCache(cache);

// Routes
router.route(['/login'])
    .post(loginController.login) // secret needed

router.route(['/twit/account'])
    .get(tweetController.index)
    .post(validateToken, tweetController.create) // token needed
    .delete(validateToken, tweetController.delete); // token needed

router.route(['/twit/:userId/:tweetId', '/twit/:userId'])
    .get(tweetController.searchTweet);

router.route(['/product/color'])
    .get(productController.indexColor)
    .post(validateToken, productController.createColor) // token needed
    .delete(validateToken, productController.deleteColor); // token needed

router.route(['/product/size'])
    .get(productController.indexSize)
    .post(validateToken, productController.createSize) // token needed
    .delete(validateToken, productController.deleteSize); // token needed

router.route(['/order/:orderId'])
    .get(validateToken, paymentController.search); // token needed

router.route(['/order'])
    .get(validateToken, paymentController.index) // token needed
    .post(paymentController.order) // no token because it *is* the order process
    .delete(validateToken, paymentController.delete); // token needed

// Export API routes
module.exports = router;