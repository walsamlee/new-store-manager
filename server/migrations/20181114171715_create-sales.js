
exports.up = (knex, Promise) => {
    return knex.schema.createTable('sales', (table) => {
        table.increments('id');
        table.text('attendant_id');
        table.text('attendant_email');
        table.text('products');
        table.float('total');
        table.text('date');
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('sales');
};