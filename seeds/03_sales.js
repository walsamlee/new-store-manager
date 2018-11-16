'use strict';

var _sales = require('../dist/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('sales').del().then(function () {
    // Inserts seed entries
    return knex('sales').insert(_sales2.default);
  });
};