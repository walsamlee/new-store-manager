'use strict';

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
    addProduct: function addProduct(req, res) {
        _queries2.default.addProduct(req.body).then(function (product) {
            res.json(product[0]);
        });
    },
    viewProducts: function viewProducts(req, res, next) {
        _queries2.default.getProducts().then(function (products) {
            if (products) {
                return res.json(products);
            }

            next();
        });
    },
    viewProductById: function viewProductById(req, res, next) {
        _queries2.default.getProductById(req.params.productId).then(function (product) {
            if (product) {
                return res.json(product);
            }
            next();
        });
    }
};

module.exports = Product;