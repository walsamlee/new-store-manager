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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {
            status: 404
        }
    });
});

module.exports = server;