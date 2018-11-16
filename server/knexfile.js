module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/knex-store-manager'
    },
    test: {
        client: 'pg',
        connection: 'postgres://lzozyytr:7KV2XZHhNiDzFU-IN4IQtVmCITXwLv7F@elmer.db.elephantsql.com:5432/lzozyytr'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    },

};