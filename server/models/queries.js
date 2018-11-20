import knex from './knex';

module.exports = {
    getProducts() {
        return knex('products');
    },

    getProductById(id) {
        return knex('products').where('id', id).first();
    },

    postProduct(product) {
        return knex('products').insert(product, '*');
    },

    putProduct(id, product) {
        return knex('products').where('id', id).update(product, '*');
    },

    deleteProduct(id) {
        return knex('products').where('id', id).del();
    },

    addSales(sales) {
        return knex('sales').insert(sales, '*');
    },

    getSales() {
        return knex('sales');
    },

    getSalesById(id) {
        return knex('sales').where('id', id).first();
    },

    addUser(user) {
        return knex('users').insert(user, '*');
    },

    getUser(email) {
        return knex('users').where('email', email).first();
    }
    
}