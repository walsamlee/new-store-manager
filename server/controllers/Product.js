import client from '../models/db';
import queries from '../models/queries';

const Product = {
    addProduct(req, res) {
        queries.addProduct(req.body).then(product => {
            res.json(product[0]);
        })
    },

    viewProducts(req, res, next) {
        queries.getProducts().then(products => {
            if(products) {
                return res.json(products);
            }

            next();
        });
    },

    viewProductById(req, res, next) {
        queries.getProductById(req.params.productId).then(product => {
            if(product) {
                return res.json(product);
            }
            next();
        })
    }
};

module.exports = Product;