'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('cart', function (table) {
        table.text('seller_email');
        table.text('product');
        table.float('cost');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cart');
};