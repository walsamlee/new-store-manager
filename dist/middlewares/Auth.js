'use strict';

var Auth = {
    verifyAdmin: function verifyAdmin(req, res, next) {
        var token = parseInt(req.headers.token, 10);

        if (token !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized to access sales route'
            });
        }

        next();
    },
    verifyAttendant: function verifyAttendant(req, res, next) {
        var token = parseInt(req.headers.token, 10);

        if (token !== 0) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized to access route'
            });
        }

        next();
    }
};

module.exports = Auth;