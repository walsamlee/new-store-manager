'use strict';

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
    addProduct: function addProduct(req, res) {
        console.log(req.file);
        if (!req.file) {
            return res.json({
                message: 'Please upload a an image file'
            });
        }
        var data = {
            image: req.file.path,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            date: req.body.date,
            minimum: req.body.minimum
        };
        _queries2.default.postProduct(data).then(function (product) {
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
    },
    viewProductByCategory: function viewProductByCategory(req, res, next) {
        _queries2.default.getProductByCategory(req.params.category).then(function (product) {
            if (product) {
                return res.json(product);
            }

            next();
        });
    },
    editProduct: function editProduct(req, res, next) {
        _queries2.default.putProduct(req.params.productId, req.body).then(function (product) {
            if (product[0]) {
                return res.json(product[0]);
            }

            next();
        });
    },
    editSalesProduct: function editSalesProduct(req, res, next) {
        _queries2.default.putSalesProduct(req.params.productId, req.body.quantity).then(function (product) {
            if (product[0]) {
                return res.json(product[0]);
            }

            next();
        });
    },
    removeProduct: function removeProduct(req, res, next) {
        _queries2.default.getProductById(req.params.productId).then(function (product) {
            if (product) {
                _queries2.default.deleteProduct(req.params.productId).then(function () {
                    return res.json({
                        message: 'Product removed'
                    });
                });
            } else {
                return res.json({
                    message: 'Product not found'
                });
            }

            next();
        });
    }
};

module.exports = Product;