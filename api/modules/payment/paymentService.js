const stripeKeySecret = process.env.STRIPE_KEY_SECRET;
const stripe = require("stripe")(stripeKeySecret);
// const fetch = require('node-fetch');
const uniqid = require('uniqid');
const { Order } = require('./paymentModel');

/**
 * Methods
 */

// search
exports.search = function (req, res) {
    let orderId = (req.params.orderId) ? req.params.orderId : '';
    return new Promise((resolve, reject) => {
        Order.findOne({ orderId: orderId })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};

// index
exports.index = function (req, res) {
    return new Promise((resolve, reject) => {
        Order.find()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};

// stripe - // https://stripe.com/docs/api/charges/create
async function saveStripe(data) {
    return await stripe.charges.create(data);
}

// create
exports.create = function (req, res) {
    return new Promise((resolve, reject) => {
        try {
            // Stripe
            const { amount, source, order } = req.body;
            const receipt_email = 'cecil.stradford@gmail.com'; // TODO change to fulfillment email
            const orderId = uniqid();
            const currency = 'usd';
            const description = 'twit-tee order #' + orderId;
            const metadata = { 'order_id': orderId };
            const status = "new";
            saveStripe({
                amount,
                currency,
                source,
                description,
                metadata,
            })
                .then(charge => {
                    if (!charge) throw new Error('charge unsuccessful')
                    let data = {
                        orderId,
                        status,
                        charge,
                        order,
                    };

                    // Order
                    Order.find({ orderId: orderId })
                        .then(result => {
                            if (result.length) {
                                reject('exists');
                            } else {
                                Order.create(data)
                                    .then(result => {
                                        // TODO: Send email
                                        console.log("order", JSON.stringify(data));
                                        resolve({receipt_url:result.charge.receipt_url});
                                    })
                                    .catch(err => {
                                        reject(err);
                                    })
                            }
                        })
                        .catch(err => {
                            reject(err);
                        })
                })
                .catch(err => {
                    reject(err);
                })
        } catch (err) {
            reject(err);
        }
    })
};

// delete
exports.delete = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        Order.deleteMany({ orderId: data.orderId })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};



/* order example...

*/