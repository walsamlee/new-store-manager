'use strict';

var _knex = require('../models/knex');

var _knex2 = _interopRequireDefault(_knex);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _testdata = require('./testdata');

var _testdata2 = _interopRequireDefault(_testdata);

var _nodeMocksHttp = require('node-mocks-http');

var _nodeMocksHttp2 = _interopRequireDefault(_nodeMocksHttp);

var _Auth = require('../middlewares/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Product = require('../controllers/Product');

var _Product2 = _interopRequireDefault(_Product);

var _User = require('../controllers/User');

var _User2 = _interopRequireDefault(_User);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CRUD store manager', function () {
    before(function (done) {
        _knex2.default.migrate.latest().then(function () {
            return _knex2.default.seed.run();
        }).then(function () {
            return done();
        });
    });

    it('test GET /api/v1/products route', function (done) {
        (0, _supertest2.default)(_app2.default).get('/api/v1/products').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.be.a('array');
                (0, _chai.expect)(response.body.length).to.be.equal(_testdata2.default.products.length);
            }

            done();
        });
    });

    it('test GET /api/v1/products/:productId route', function (done) {
        (0, _supertest2.default)(_app2.default).get('/api/v1/products/1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.be.a('object');
                (0, _chai.expect)(response.body).to.have.property('id');
                (0, _chai.expect)(response.body).to.have.property('name');
                (0, _chai.expect)(response.body).to.have.property('description');
                (0, _chai.expect)(response.body).to.have.property('category');
                (0, _chai.expect)(response.body).to.have.property('quantity');
                (0, _chai.expect)(response.body).to.have.property('price');
                (0, _chai.expect)(response.body).to.have.property('date');
                (0, _chai.expect)(response.body).to.have.property('minimum');
            }

            done();
        });
    });

    it('test POST /api/v1/products route', function (done) {
        (0, _supertest2.default)(_app2.default).post('/api/v1/products').send(_testdata2.default.product1).set('Accept', 'application/json').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74').expect('Content-Type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.be.a('object');
                (0, _chai.expect)(response.body).to.deep.equal(_testdata2.default.product1);
            }

            done();
        });
    });

    it('test verifyToken function for admin', function (done) {
        var adminTestDecode = {
            "email": "admin@store.com",
            "previlledge": 1,
            "iat": 1542811305,
            "exp": 1574368905
        };
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74"
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyToken(req, res, next);

        (0, _chai.expect)(req.userData).to.deep.equal(adminTestDecode);

        done();
    });

    it('test verifyToken function for attendant', function (done) {
        var adminTestDecode = {
            "email": "store2@store.com",
            "previlledge": 0,
            "iat": 1542811107,
            "exp": 1574368707
        };
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0b3JlMkBzdG9yZS5jb20iLCJwcmV2aWxsZWRnZSI6MCwiaWF0IjoxNTQyODExMTA3LCJleHAiOjE1NzQzNjg3MDd9.7VKS-StyyrzKGRBNerHFqZY_4J62FpFPDaBQrdluxXw"
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyToken(req, res, next);

        (0, _chai.expect)(req.userData).to.deep.equal(adminTestDecode);

        done();
    });

    it('test verifyAdmin function', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74"
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyAdmin(req, res, next);

        (0, _chai.expect)(req.userData.previlledge).to.be.equal(1);

        done();
    });

    it('test verifyAttendant function', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0b3JlMkBzdG9yZS5jb20iLCJwcmV2aWxsZWRnZSI6MCwiaWF0IjoxNTQyODExMTA3LCJleHAiOjE1NzQzNjg3MDd9.7VKS-StyyrzKGRBNerHFqZY_4J62FpFPDaBQrdluxXw"
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyAttendant(req, res, next);

        (0, _chai.expect)(req.userData.previlledge).to.be.equal(0);

        done();
    });

    it('test addProduct function', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            body: _testdata2.default.product2
        });

        var res = _nodeMocksHttp2.default.createResponse();

        _Product2.default.addProduct(req, res);
        (0, _chai.expect)(res.statusCode).to.be.equal(200);

        done();
    });

    it('test GET /api/v1/sales route', function (done) {
        (0, _supertest2.default)(_app2.default).get('/api/v1/sales').set('Accept', 'application/json').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74').expect('Content-type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.be.a('array');
                (0, _chai.expect)(response.body).to.deep.equal(_testdata2.default.sales);
            }

            done();
        });
    });

    it('test POST /auth/signup route', function (done) {
        (0, _supertest2.default)(_app2.default).post('/auth/signup').set('Accept', 'application/json').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74').expect('Content-Type', /json/).send(_testdata2.default.user2).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body.email).to.deep.equal(_testdata2.default.signupUser.email);
                (0, _chai.expect)(response.statusCode).to.be.equal(200);
                (0, _chai.expect)(response.body).to.be.a('object');
            }

            done();
        });
    });

    it('test addUser function', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            body: _testdata2.default.user1
        });

        var res = _nodeMocksHttp2.default.createResponse();

        _User2.default.addUser(req, res);

        (0, _chai.expect)(res.statusCode).to.be.equal(200);

        done();
    });

    it('test POST /auth/login function', function (done) {
        (0, _supertest2.default)(_app2.default).post('/auth/login').send(_testdata2.default.loginUser).set('Accept', 'application/json').expect('Content-type', /json/).expect(200).end(function (err, response) {
            // console.log(response.body);
            if (err) {
                throw err;
            } else {
                (0, _chai.expect)(response.body).to.be.a('string');
                (0, _chai.expect)(response.statusCode).to.be.equal(200);
            }

            done();
        });
    });

    it('test PUT /api/v1/products/:productId route', function (done) {
        (0, _supertest2.default)(_app2.default).put('/api/v1/products/5').send(_testdata2.default.product3).set('Accept', 'application/json').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74').expect('Content-Type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                _testdata2.default.product3.id = 5;
                (0, _chai.expect)(response.body).to.deep.equal(_testdata2.default.product3);
            }

            done();
        });
    });

    it('test DELETE /api/v1/products/:productId route', function (done) {
        (0, _supertest2.default)(_app2.default).delete('/api/v1/products/4').set('Accept', 'application/json').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74').expect('Content-Type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.deep.equal({
                    message: 'Product removed'
                });
            }

            done();
        });
    });
});