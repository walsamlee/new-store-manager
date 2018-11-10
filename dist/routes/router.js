'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../controllers/User');

var _User2 = _interopRequireDefault(_User);

var _Sales = require('../controllers/Sales');

var _Sales2 = _interopRequireDefault(_Sales);

var _Product = require('../controllers/Product');

var _Product2 = _interopRequireDefault(_Product);

var _Auth = require('../middlewares/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    res.status(200).send('Homepage');
    next();
});

router.get('/login', _User2.default.login);

router.get('/api/v1/products', _Product2.default.viewProducts);

router.get('/api/v1/products/:productId', _Product2.default.viewProductsById);

router.post('/api/v1/products', _Auth2.default.verifyAdmin, _Product2.default.addProduct);

router.get('/api/v1/sales', _Auth2.default.verifyAdmin, _Sales2.default.viewSales);

router.get('/api/v1/sales/:salesId', _Sales2.default.viewSalesById);

router.post('/api/v1/sales', _Auth2.default.verifyAttendant, _Sales2.default.createSales);

module.exports = router;