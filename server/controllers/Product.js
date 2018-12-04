import queries from '../models/queries';

const Product = {
    addProduct(req, res) {
        console.log(req.file);
        if(!req.file) {
            return res.json({
                message: 'Please upload a an image file'
            });
        }
        const data = {
            image: req.file.path,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            date: req.body.date,
            minimum: req.body.minimum
        };
        queries.postProduct(data).then(product => {
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
    
    viewProductByCategory(req, res, next) {
        queries.getProductByCategory(req.params.category).then(product => {
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