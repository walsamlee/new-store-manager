'use strict';

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sales = {
    viewSalesById: function viewSalesById(req, res, next) {
        var token = parseInt(req.headers.token, 10);

        _queries2.default.getSalesById(req.params.salesId).then(function (sales) {
            if (sales) {
                if (token === 1 || sales.attendant_id === req.headers.id) {
                    return res.json(sales);
                }

                return res.status(401).json({
                    message: 'Unathourized to view sales'
                });
            }

            next();
        });
    },
    viewSales: function viewSales(req, res, next) {
        _queries2.default.getSales().then(function (sales) {
            if (sales) {
                return res.json(sales);
            }

            next();
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
        };

        var thisSale = {
            attendant_id: attendant_id,
            attendant_email: attendant_email,
            products: products,
            total: total,
            date: date
        };

        _queries2.default.addSales(thisSale).then(function (sales) {
            res.json(sales[0]);
        });
    }
};

module.exports = Sales;