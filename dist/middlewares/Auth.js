'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = {
    verifyToken: function verifyToken(req, res, next) {
        var token = req.headers.token;

        _jsonwebtoken2.default.verify(token, 'theadminisgreat', function (err, decoded) {
            if (err) {
                return res.json({
                    message: 'Invalid token verification'
                });
            }
            req.userData = decoded;
            res.status(200);

            next();
        });
    },
    verifyAdmin: function verifyAdmin(req, res, next) {
        var token = req.headers.token;

        _jsonwebtoken2.default.verify(token, 'theadminisgreat', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token for admin'
                });
            }

            if (decoded) {
                if (decoded.previlledge !== 1) {
                    return res.json({
                        message: 'Unauthorized to access this route'
                    });
                }
            }
            req.userData = decoded;
            res.status(200);
            next();
        });
    },
    verifyAttendant: function verifyAttendant(req, res, next) {
        var token = req.headers.token;

        _jsonwebtoken2.default.verify(token, 'theadminisgreat', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token for attendant'
                });
            }

            if (decoded) {
                if (decoded.previlledge !== 0) {
                    return res.json({
                        message: 'Unauthorized to access this route'
                    });
                }
            }
            req.userData = decoded;
            res.status(200);
            next();
        });
    }
};

module.exports = Auth;