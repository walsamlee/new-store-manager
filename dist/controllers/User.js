'use strict';

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var User = {
    login: function login(req, res) {
        var uEmail = req.body.email,
            uPassword = req.body.password;

        if (uEmail === undefined || uPassword === undefined) {
            return res.json({
                message: "Invalid username or password"
            });
        }

        _queries2.default.getUser(uEmail).then(function (aUser) {
            if (aUser) {
                _bcrypt2.default.compare(uPassword, aUser.password, function (err, response) {
                    if (response) {
                        _jsonwebtoken2.default.sign({
                            email: aUser.email,
                            previlledge: aUser.previlledge
                        }, 'theadminisgreat', {
                            expiresIn: '1y'
                        }, function (err, token) {
                            if (token) {
                                return res.status(200).json({
                                    token: token,
                                    email: aUser.email
                                });
                            }
                            if (err) {
                                res.status(404).json({
                                    message: 'No token available'
                                });
                            }
                        });
                    } else {
                        res.status(400).json({
                            message: "Wrong username or password"
                        });
                    }
                });
            } else {
                res.status(400).json({
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
            _queries2.default.postUser(userData).then(function (user) {
                return res.json(user[0]);
            });
        });
    },
    removeUser: function removeUser(req, res) {
        var email = req.params.email;
        _queries2.default.deleteUser(email).then(function () {
            res.json({
                message: 'User with email ' + email + ' deleted successfully'
            });
        });
    },
    editUser: function editUser(req, res) {
        var email = req.params.email;
        var previlledge = req.body.previlledge;

        if (req.body.password) {
            _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.json({
                        message: err
                    });
                }

                var userData = {
                    password: hash,
                    previlledge: previlledge
                };
                _queries2.default.putUser(email, userData).then(function (user) {
                    return res.json(user[0]);
                });
            });
        } else {
            var userData = {
                previlledge: previlledge
            };
            _queries2.default.putUser(email, userData).then(function (user) {
                return res.json(user[0]);
            });
        }
    },
    viewUsers: function viewUsers(req, res) {
        _queries2.default.getUsers().then(function (users) {
            return res.json(users);
        });
    },
    admin: function admin(req, res) {
        var token = req.userData.previlledge;

        return res.json(token);
    }
};

module.exports = User;