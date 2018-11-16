
exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.text('email');
        table.text('password');
        table.integer('previlledge');
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};