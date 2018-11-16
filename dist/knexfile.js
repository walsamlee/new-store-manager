'use strict';

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/knex-store-manager'
    },
    test: {
        client: 'pg',
        connection: 'postgres://ueirllul:0_cJHKky9vNlO0iNVvre6IAruhiWOEsV@baasu.db.elephantsql.com:5432/ueirllul'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }

};