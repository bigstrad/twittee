const LoginService = require('./loginService');

exports.login = (req, res) => {
    LoginService.login(req, res)
        .then(result => {
            let { token, status } = result;
            if (status === 401) {
                res.error = 'Authentication error';
            }
            res.status(status).json(token);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
};