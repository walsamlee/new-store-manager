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
    postProduct: function postProduct(product) {
        return (0, _knex2.default)('products').insert(product, '*');
    },
    putProduct: function putProduct(id, product) {
        return (0, _knex2.default)('products').where('id', id).update(product, '*');
    },
    deleteProduct: function deleteProduct(id) {
        return (0, _knex2.default)('products').where('id', id).del();
    },
    addSales: function addSales(sales) {
        return (0, _knex2.default)('sales').insert(sales, '*');
    },
    getSales: function getSales() {
        return (0, _knex2.default)('sales');
    },
    getSalesById: function getSalesById(id) {
        return (0, _knex2.default)('sales').where('id', id).first();
    },
    addUser: function addUser(user) {
        return (0, _knex2.default)('users').insert(user, '*');
    },
    getUser: function getUser(email) {
        return (0, _knex2.default)('users').where('email', email).first();
    }
};