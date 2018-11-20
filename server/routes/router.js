import express from 'express';
import User from '../controllers/User';
import Sales from '../controllers/Sales';
import Product from '../controllers/Product';
import Auth from '../middlewares/Auth';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send('Homepage');
    next();
});

router.post('/auth/login', User.login);

router.get('/api/v1/products', Product.viewProducts);

router.get('/api/v1/products/:productId', Product.viewProductById);

router.post('/api/v1/products', Auth.verifyAdmin, Product.addProduct);

router.put('/api/v1/products/:productId', Auth.verifyAdmin, Product.editProduct);

router.delete('/api/v1/products/:productId', Auth.verifyAdmin, Product.removeProduct);

router.get('/api/v1/sales', Auth.verifyAdmin, Sales.viewSales);

router.get('/api/v1/sales/:salesId', Auth.verifyToken, Sales.viewSalesById);

router.post('/api/v1/sales', Auth.verifyAttendant, Sales.createSales);

router.post('/auth/signup', Auth.verifyAdmin, User.addUser);

module.exports = router;