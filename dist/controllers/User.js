'use strict';

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
    login: function login(req, res) {
        var uEmail = req.body.email,
            uPassword = req.body.password;

        _queries2.default.getUser(uEmail).then(function (aUser) {
            if (aUser) {
                _bcrypt2.default.compare(uPassword, aUser.password, function (err, response) {
                    if (response) {
                        _jsonwebtoken2.default.sign({
                            email: aUser.email,
                            previlledge: aUser.previlledge
                        }, 'theadminisgreat', {
                            expiresIn: '1d'
                        }, function (err, token) {
                            if (token) {
                                return res.json(token);
                            }
                            if (err) {
                                res.json({
                                    message: 'No token available'
                                });
                            }
                        });
                    } else {
                        res.json({
                            message: "Wrong username or password"
                        });
                    }
                });
            } else {
                res.json({
                    message: "Wrong username or password"
                });
            }
        });
    },
    addUser: function addUser(req, res) {
        var email = req.body.email;
        var previlledge = req.body.previlledge;

        _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                return res.json({
                    message: err
                });
            }

            var userData = {
                email: email,
                password: hash,
                previlledge: previlledge
            };
            _queries2.default.addUser(userData).then(function (user) {
                res.json(user[0]);
            });
        });
    }
};

module.exports = User;