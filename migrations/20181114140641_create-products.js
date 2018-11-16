'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('products', function (table) {
        table.interger('id');
        table.text('name');
        table.text('description');
        table.text('category');
        table.integer('quantity');
        table.float('price');
        table.text('date');
        table.integer('minimum');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('products');
};