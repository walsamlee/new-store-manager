'use strict';

var _users = require('../users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function () {
    // Inserts seed entries
    return knex('users').insert(_users2.default);
  });
};