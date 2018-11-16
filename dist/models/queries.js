'use strict';

var _knex = require('./knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    getProducts: function getProducts() {
        return (0, _knex2.default)('products');
    },
    getProductById: function getProductById(id) {
        return (0, _knex2.default)('products').where('id', id).first();
    },
    addProduct: function addProduct(product) {
        return (0, _knex2.default)('products').insert(product, '*');
    },
    addSales: function addSales(sales) {
        return (0, _knex2.default)('sales').insert(sales, '*');
    },
    getSalesById: function getSalesById(id) {
        return (0, _knex2.default)('sales').where('id', id).first();
    }
};