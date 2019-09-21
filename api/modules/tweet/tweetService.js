const { TweetAccount } = require('./tweetModel');

/**
 * Methods
 */

// index
exports.index = function (req, res) {
    return new Promise((resolve, reject) => {
        TweetAccount.find()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};

// create
exports.create = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        TweetAccount.find({ label: data.value })
            .then(result => {
                if (result.length) {
                    reject('exists');
                } else {
                    TweetAccount.create(data)
                        .then(result => {
                            resolve(result);
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
};

// delete
exports.delete = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        TweetAccount.deleteMany({ uuid: data.uuid })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};