import queries from '../models/queries';

const Product = {
    addProduct(req, res) {
        queries.postProduct(req.body).then(product => {
            res.json(product[0]);
        });
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
        });
    },

    editProduct(req, res, next) {
        queries.putProduct(req.params.productId, req.body).then(product => {
            if(product[0]) {
                return res.json(product[0]);
            }
            
            next();
        });
    },

    removeProduct(req, res, next) {
        queries.getProductById(req.params.productId).then(product => {
            if(product) {
                queries.deleteProduct(req.params.productId).then(() => {
                    return res.json({
                        message: 'Product removed'
                    });
                });
            } else {
                return res.json({
                    message: 'Product not found'
                });
            }
        });
        
    }
};

module.exports = Product;