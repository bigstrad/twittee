const { TeeColor, TeeSize } = require('./productModel');

/**
 * Methods
 */

// indexColor
exports.indexColor = function (req, res) {
    return new Promise((resolve, reject) => {
        TeeColor.find()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};

// indexSize
exports.indexSize = function (req, res) {
    return new Promise((resolve, reject) => {
        TeeSize.find()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};

// createColor
exports.createColor = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        TeeColor.find({ label: data.value })
            .then(result => {
                if (result.length) {
                    reject('exists');
                } else {
                    TeeColor.create(data)
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

// createSize
exports.createSize = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        TeeSize.find({ label: data.value })
            .then(result => {
                if (result.length) {
                    reject('exists');
                } else {
                    TeeSize.create(data)
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

// deleteColor
exports.deleteColor = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        TeeColor.deleteMany({ uuid: data.uuid })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};

// deleteSize
exports.deleteSize = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        TeeSize.deleteMany({ uuid: data.uuid })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
};