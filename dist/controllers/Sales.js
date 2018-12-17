'use strict';

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sales = {
    viewSalesById: function viewSalesById(req, res, next) {
        var token = req.userData.previlledge;

        _queries2.default.getSalesById(req.params.salesId).then(function (sales) {
            if (sales) {
                if (token === 1 || sales.attendant_email === req.userData.email) {
                    return res.json(sales);
                } else {
                    return res.status(401).json({
                        message: 'Unathourized to view sales'
                    });
                }
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
        var id = req.body.id,
            attendant_id = req.body.attendant_id,
            attendant_email = req.body.attendant_email,
            date = req.body.date,
            sales = req.body.sales;

        var products = '',
            total = 0;

        for (var i = 0; i < sales.length; i++) {
            products += sales[i].product + ', ';
            total += sales[i].price * sales[i].quantity;
        }

        var thisSale = {
            id: id,
            attendant_id: attendant_id,
            attendant_email: attendant_email,
            products: products,
            total: total,
            date: date
        };

        _queries2.default.addSales(thisSale).then(function (sales) {
            res.json(sales[0]);
        });
    },
    addToCart: function addToCart(req, res) {
        _queries2.default.postCart(req.body).then(function (cart) {
            return res.json(cart[0]);
        });
    },
    cart: function cart(req, res) {
        _queries2.default.getCart(req.params.email).then(function (cart) {
            return res.json(cart);
        });
    },
    updateCart: function updateCart(req, res) {
        _queries2.default.updateCart(req.body.email, req.body.product, req.body.cost).then(function (cart) {
            return res.json(cart);
        });
    },
    updateCartByEmail: function updateCartByEmail(req, res) {
        _queries2.default.updateCartEmail(req.params.email, req.body.cost).then(function (cart) {
            res.json(cart);
        });
    },
    removeCart: function removeCart(req, res) {
        _queries2.default.deleteCart(req.params.email).then(function () {
            return res.json({
                message: 'Cart removed'
            });
        });
    }
};

module.exports = Sales;