'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var client = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
});

client.connect(function (err) {
    if (!err) return console.log('Connected to db');
});

exports.default = client;