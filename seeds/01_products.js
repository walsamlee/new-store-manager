'use strict';

var _products = require('../producttest');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del().then(function () {
    // Inserts seed entries
    return knex('products').insert(_products2.default);
  });
};