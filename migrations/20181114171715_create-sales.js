'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('sales', function (table) {
        table.integer('id');
        table.text('attendant_id');
        table.text('attendant_email');
        table.text('products');
        table.float('total');
        table.text('date');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('sales');
};