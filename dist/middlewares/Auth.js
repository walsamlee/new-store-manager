'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = {
    verifyToken: function verifyToken(req, res, next) {
        var token = req.headers.token;

        _jsonwebtoken2.default.verify(token, 'theadminisgreat', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token'
                });
            }
            req.userData = decoded;

            next();
        });
    },
    verifyAdmin: function verifyAdmin(req, res, next) {
        var token = req.headers.token;

        _jsonwebtoken2.default.verify(token, 'theadminisgreat', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token'
                });
            }

            if (decoded) {
                if (decoded.previlledge !== 1) {
                    return res.status(401).json({
                        message: 'Unauthorized to access this route'
                    });
                }
            }
            req.userData = decoded;

            next();
        });
    },
    verifyAttendant: function verifyAttendant(req, res, next) {
        var token = req.headers.token;

        _jsonwebtoken2.default.verify(token, 'theadminisgreat', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token'
                });
            }

            if (decoded) {
                if (decoded.previlledge !== 0) {
                    return res.status(401).json({
                        message: 'Unauthorized to access this route'
                    });
                }
            }
            req.userData = decoded;

            next();
        });
    }
};

module.exports = Auth;