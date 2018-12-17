'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('tablecart', function (table) {
        table.text('seller_email');
        table.text('product');
        table.float('cost');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tablecart');
};