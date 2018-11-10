'use strict';

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
    login: function login(req, res) {
        var uEmail = req.body.email;
        var aUser = void 0;
        var query = {
            text: 'SELECT * FROM users WHERE email = $1',
            value: [uEmail]
        };

        _db2.default.query(query, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false,
                    message: 'Failed to load user'
                });
            }

            aUser = result.rows[0];

            if (aUser.email !== req.body.email && aUser.password !== req.body.password) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            res.status(200).send({
                success: true,
                message: 'User found',
                data: aUser.email
            });
        });
    }
};

module.exports = User;