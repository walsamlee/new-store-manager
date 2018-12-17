import knex from './knex';

module.exports = {
    getProducts() {
        return knex('products');
    },

    getProductById(id) {
        return knex('products').where('id', id).first();
    },
    
    getProductByCategory(category) {
        return knex('products').where('category', category);
    },

    postProduct(product) {
        return knex('products').insert(product, '*');
    },

    putProduct(id, product) {
        return knex('products').where('id', id).update(product, '*');
    },
    
    putSalesProduct(id, quantity) {
        return knex('products').where('id', id).update('quantity', quantity);
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
    
    deleteUser(email) {
        return knex('users').where('email', email).del();
    },

    postUser(user) {
        return knex('users').insert(user, '*');
    },
    
    putUser(email, user) {
        return knex('users').where('email', email).update(user, '*');
    },
    
    getUsers() {
        return knex('users');
    },

    getUser(email) {
        return knex('users').where('email', email).first();
    },
    
    postCart(order) {
        return knex('cart').insert(order, '*');
    },
    
    getCart(email) {
        return knex('cart').where('seller_email', email);
    },
    
    updateCart(email, product, cost) {
        return knex('cart').where({
            'seller_email': email,
            'product': product
        }).update({
            'cost': cost
        });
    },
    
    updateCartEmail(email, cost) {
        return knex('cart').where('seller_email', email).update('cost', cost);
    },
    
    deleteCart(email) {
        return knex('cart').where('seller_email', email).del();
    }
    
};