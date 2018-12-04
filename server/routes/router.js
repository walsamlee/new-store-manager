import express from 'express';
import multer from 'multer';
import User from '../controllers/User';
import Sales from '../controllers/Sales';
import Product from '../controllers/Product';
import Auth from '../middlewares/Auth';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const limits = {
    fileSize: 1024 * 1024 * 2
};
const uploads = multer({
    storage: storage,
    limits: limits
});
router.post('/upload', uploads.single('image'), (req, res) => {
    if(!req.file) {
        return res.json({
            message: 'no image to upload'
        })
    } else res.json();
});
router.post('/auth/login', User.login);
router.post('/auth/signup', Auth.verifyAdmin, User.addUser);

router.post('/auth/admin', Auth.verifyToken, User.admin);

router.get('/api/v1/products', Product.viewProducts);
router.get('/api/v1/products/:productId', Product.viewProductById);
router.get('/api/v1/products/category/:category', Product.viewProductByCategory);
router.post('/api/v1/products', Auth.verifyAdmin, uploads.single('image'), Product.addProduct);
router.put('/api/v1/products/:productId', Auth.verifyAdmin, Product.editProduct);
router.delete('/api/v1/products/:productId', Auth.verifyAdmin, Product.removeProduct);

router.get('/api/v1/sales', Auth.verifyAdmin, Sales.viewSales);
router.get('/api/v1/sales/:salesId', Auth.verifyToken, Sales.viewSalesById);
router.post('/api/v1/sales', Auth.verifyAttendant, Sales.createSales);

module.exports = router;