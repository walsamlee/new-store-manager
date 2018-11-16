import products from '../products'

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex('products').del()
      .then(() => {
        // Inserts seed entries
        return knex('products').insert(products);
      });
  };