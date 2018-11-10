'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.use(_express2.default.json());

app.use('/', _router2.default);

var server = app.listen(port, function () {
    console.log('App listening on port ' + port);
});

module.exports = server;