'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.text('email');
        table.text('password');
        table.integer('previlledge');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};