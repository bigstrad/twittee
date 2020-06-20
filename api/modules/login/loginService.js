const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

exports.login = function (req, res) {
    const { secret } = req.body;
    const out = {
        token: {},
        status: 401,
    }
    return new Promise((resolve, reject) => {
        try {
            if (secret === jwtSecret) {
                const user = { name: 'admin' };
                const payload = { user: user.name };
                const options = { expiresIn: '1d', issuer: 'https://twit-tee.com' };
                let token = jwt.sign(payload, jwtSecret, options);
                out.token = {token};
                out.status = 200
                resolve(out);
            } else {
                resolve(out);
            }
        } catch (err) {
            reject(err);
        }
    })
};