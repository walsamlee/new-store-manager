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

    it('Show all products', function (done) {
        (0, _supertest2.default)(_app2.default).get('/api/v1/products').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.be.a('array');
                (0, _chai.expect)(response.body.length).to.be.equal(_testdata2.default.products.length);
            }

            done();
        });
    });

    it('Show product by id', function (done) {
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

    it('Add product', function (done) {
        (0, _supertest2.default)(_app2.default).post('/api/v1/products').send(_testdata2.default.product).set('Accept', 'application/json').expect('Content-Type', /json/).expect(401).end(function (err, response) {
            if (err) throw err;else {
                console.log(response.body);
                (0, _chai.expect)(response.body).to.be.a('object');
            }
        });

        done();
    });

    it('verifyAdmin status should be 200', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: 1
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyAdmin(req, res, next);

        (0, _chai.expect)(res.statusCode).to.be.equal(200);

        done();
    });

    it('verifyAttendant status should be 200', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            headers: {
                token: 0
            }
        });

        var res = _nodeMocksHttp2.default.createResponse();
        var next = function next() {};

        _Auth2.default.verifyAttendant(req, res, next);

        (0, _chai.expect)(res.statusCode).to.be.equal(200);

        done();
    });

    it('should add product', function (done) {
        var req = _nodeMocksHttp2.default.createRequest({
            body: _testdata2.default.product
        });

        var res = _nodeMocksHttp2.default.createResponse();

        _Product2.default.addProduct(req, res);
        (0, _chai.expect)(res.statusCode).to.be.equal(200);

        done();
    });

    it('should return sales', function (done) {
        (0, _supertest2.default)(_app2.default).get('/api/v1/sales').set('Accept', 'application/json').expect('Content-type', /json/).expect(401).end(function (err, response) {
            if (err) throw err;else {
                (0, _chai.expect)(response.body).to.be.a('object');
            }

            done();
        });
    });
});