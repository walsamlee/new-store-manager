'use strict';

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
    addProduct: function addProduct(req, res) {
        var name = req.body.name,
            description = req.body.description,
            category = req.body.category,
            quantity = req.body.quantity,
            price = req.body.price,
            date = req.body.date,
            minimum = req.body.minimum;
        var query = {
            text: 'INSERT INTO products(name, description, category, quantity, price, date, minimum) VALUES($1, $2, $3, $4, $5, $6, $7)',
            values: [name, description, category, quantity, price, date, minimum]
        };
        _db2.default.query(query, function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Product could not be added'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Products added successfully',
                data: [name, description, category, quantity, price, date, minimum]
            });
        });
    },
    viewProducts: function viewProducts(req, res) {
        _db2.default.query('SELECT * FROM products', function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Product could not be retrieved'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Products retrieved successfully',
                data: result.rows
            });
        });
    },
    viewProductsById: function viewProductsById(req, res) {
        var product_id = parseInt(req.params.productId, 10);
        var query = {
            text: 'SELECT * FROM products WHERE id = $1',
            values: [product_id]
        };

        _db2.default.query(query, function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Product could not be retrieved'
                });
            }

            if (result.rows[0] === undefined) {
                return res.status(404).send({
                    success: false,
                    message: 'Product with ID ' + product_id + ' was not found'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Products retrieved successfully',
                data: result.rows[0]
            });
        });
    }
};

module.exports = Product;