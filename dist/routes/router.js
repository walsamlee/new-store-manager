'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

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

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var limits = {
    fileSize: 1024 * 1024 * 2
};
var uploads = (0, _multer2.default)({
    storage: storage,
    limits: limits
});
router.post('/upload', uploads.single('image'), function (req, res) {
    if (!req.file) {
        return res.json({
            message: 'no image to upload'
        });
    } else res.json();
});
router.post('/auth/login', _User2.default.login);
router.post('/auth/signup', _Auth2.default.verifyAdmin, _User2.default.addUser);

router.post('/auth/admin', _Auth2.default.verifyToken, _User2.default.admin);

router.get('/api/v1/products', _Product2.default.viewProducts);
router.get('/api/v1/products/:productId', _Product2.default.viewProductById);
router.get('/api/v1/products/category/:category', _Product2.default.viewProductByCategory);
router.post('/api/v1/products', _Auth2.default.verifyAdmin, uploads.single('image'), _Product2.default.addProduct);
router.put('/api/v1/products/:productId', _Auth2.default.verifyAdmin, _Product2.default.editProduct);
router.delete('/api/v1/products/:productId', _Auth2.default.verifyAdmin, _Product2.default.removeProduct);

router.get('/api/v1/sales', _Auth2.default.verifyAdmin, _Sales2.default.viewSales);
router.get('/api/v1/sales/:salesId', _Auth2.default.verifyToken, _Sales2.default.viewSalesById);
router.post('/api/v1/sales', _Auth2.default.verifyAttendant, _Sales2.default.createSales);

module.exports = router;