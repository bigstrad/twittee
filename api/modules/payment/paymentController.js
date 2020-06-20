const PaymentService = require('./paymentService');

exports.search = (req, res) => {
    PaymentService.search(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.index = (req, res) => {
    PaymentService.index(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};

exports.order = (req, res) => {
    PaymentService.create(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.delete = (req, res) => {
    PaymentService.delete(req, res)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};