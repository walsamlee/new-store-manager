import sales from '../sales';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert(sales);
    });
};
