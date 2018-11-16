'use strict';

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/knex-store-manager'
    },
    test: {
        client: 'pg',
        connection: 'postgres://localhost/tester-knex-store-manager'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }

};