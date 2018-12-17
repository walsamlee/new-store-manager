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
    getProductByCategory: function getProductByCategory(category) {
        return (0, _knex2.default)('products').where('category', category);
    },
    postProduct: function postProduct(product) {
        return (0, _knex2.default)('products').insert(product, '*');
    },
    putProduct: function putProduct(id, product) {
        return (0, _knex2.default)('products').where('id', id).update(product, '*');
    },
    putSalesProduct: function putSalesProduct(id, quantity) {
        return (0, _knex2.default)('products').where('id', id).update('quantity', quantity);
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
    deleteUser: function deleteUser(email) {
        return (0, _knex2.default)('users').where('email', email).del();
    },
    postUser: function postUser(user) {
        return (0, _knex2.default)('users').insert(user, '*');
    },
    putUser: function putUser(email, user) {
        return (0, _knex2.default)('users').where('email', email).update(user, '*');
    },
    getUsers: function getUsers() {
        return (0, _knex2.default)('users');
    },
    getUser: function getUser(email) {
        return (0, _knex2.default)('users').where('email', email).first();
    },
    postCart: function postCart(order) {
        return (0, _knex2.default)('cart').insert(order, '*');
    },
    getCart: function getCart(email) {
        return (0, _knex2.default)('cart').where('seller_email', email);
    },
    updateCart: function updateCart(email, product, cost) {
        return (0, _knex2.default)('cart').where({
            'seller_email': email,
            'product': product
        }).update({
            'cost': cost
        });
    },
    updateCartEmail: function updateCartEmail(email, cost) {
        return (0, _knex2.default)('cart').where('seller_email', email).update('cost', cost);
    },
    deleteCart: function deleteCart(email) {
        return (0, _knex2.default)('cart').where('seller_email', email).del();
    }
};