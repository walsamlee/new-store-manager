import knex from './knex';

module.exports = {
    getProducts() {
        return knex('products');
    },

    getProductById(id) {
        return knex('products').where('id', id).first();
    },

    addProduct(product) {
        return knex('products').insert(product, '*');
    },

    addSales(sales) {
        return knex('sales').insert(sales, '*');
    },

    getSalesById(id) {
        return knex('sales').where('id', id).first();
    }
    
}