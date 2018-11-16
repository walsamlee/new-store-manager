'use strict';

var _chai = require('chai');

var _nodeMocksHttp = require('node-mocks-http');

var _nodeMocksHttp2 = _interopRequireDefault(_nodeMocksHttp);

var _Auth = require('../middlewares/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Should test middleware', function () {
    it('vreifyAdmin should return 1', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: 1
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyAdmin(req, res, next);

        if (res.status(200)) {
            done();
        } else {
            done(new Error('Unauthorized'));
        }
    });
});