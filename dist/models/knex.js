'use strict';

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _knexfile = require('../knexfile');

var _knexfile2 = _interopRequireDefault(_knexfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var environment = process.env.NODE_ENV || 'development';
var environmentConfig = _knexfile2.default[environment];
var connection = (0, _knex2.default)(environmentConfig);

module.exports = connection;