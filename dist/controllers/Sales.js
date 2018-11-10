'use strict';

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sales = {
    viewSalesById: function viewSalesById(req, res) {
        var sales_id = parseInt(req.params.salesId, 10);
        var token = parseInt(req.headers.token, 10);
        var headerId = parseInt(req.headers.id, 10);
        var thisSale = void 0;

        var query = {
            text: 'SELECT * FROM sales WHERE id = $1',
            values: [sales_id]
        };

        _db2.default.query(query, function (err, result) {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: 'Data cannot be loaded'
                });
            }

            if (result.rows[0] === undefined) {
                return res.status(404).send({
                    success: false,
                    message: 'Sales with ID ' + sales_id + ' not found'
                });
            }

            thisSale = result.rows[0];

            var thisSaleId = thisSale.attendant_id;

            if (token === 1 || thisSaleId === headerId) {
                return res.status(200).send({
                    success: true,
                    message: 'Sales found',
                    data: thisSale
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: 'Unauthorized to access route'
                });
            }
        });
    },
    viewSales: function viewSales(req, res) {
        _db2.default.query('SELECT * FROM sales', function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Sales records could not be retrieved'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Sales records retrieved successfully',
                data: result.rows
            });
        });
    },
    createSales: function createSales(req, res) {
        var attendant_id = req.body.attendant_id,
            attendant_email = req.body.attendant_email,
            date = req.body.date,
            sales = req.body.sales;

        var products = '',
            total = 0;

        for (var i = 0; i < sales.length; i++) {
            products += sales[i].product + ', ';
            total += sales[i].price;
        }

        var query = {
            text: 'INSERT INTO sales(attendant_id, attendant_email, date, products, total) VALUES($1, $2, $3, $4, $5)',
            values: [attendant_id, attendant_email, date, products, total]
        };

        _db2.default.query(query, function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Sales could not be recorded'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Sales recorded successfully',
                data: [attendant_id, attendant_email, date, sales]
            });
        });

        /*client.query('SELECT * FROM products', (err, result) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Product could not be retrieved',
                })
            }
             const products_data = result.rows;
             res.status(200).send({
                 success: true,
                message: 'Sales records retrieved successfully',
                data: sales
            })
        });*/
    }
};

module.exports = Sales;