import queries from '../models/queries';

const Sales = {
    viewSalesById(req, res, next) {
        const token = req.userData.previlledge;
        
        queries.getSalesById(req.params.salesId).then(sales => {
            if (sales) {
                if ((token === 1) || (sales.attendant_email === req.userData.email)) {
                    return res.json(sales);
                } else {
                    return res.status(401).json({
                        message: 'Unathourized to view sales'
                    });
                }               
            }

            next();
        }) ;

    },

    viewSales(req, res, next) {
        queries.getSales().then(sales => {
            if(sales) {
                return res.json(sales);
            }

            next();
        })
    },

    createSales(req, res) {
        const
            id = req.body.id,
            attendant_id = req.body.attendant_id,
            attendant_email = req.body.attendant_email,
            date = req.body.date,
            sales = req.body.sales;

        let products = '', total = 0;

        for (let i = 0; i < sales.length; i++) {
            products += sales[i].product + ', ';
            total += sales[i].price * sales[i].quantity;
        }

        const thisSale = {
            id: id,
            attendant_id: attendant_id,
            attendant_email: attendant_email,
            products: products,
            total: total,
            date: date,
        };

        queries.addSales(thisSale).then(sales => {
            res.json(sales[0]);
        });
    },
    
    addToCart(req, res) {
        queries.postCart(req.body).then(cart => {
            return res.json(cart[0]);
        });
    },
    
    cart(req, res) {
        queries.getCart(req.params.email).then(cart => {
            return res.json(cart);
        })
    },
    
    updateCart(req, res) {
        queries.updateCart(req.body.email, req.body.product, req.body.cost).then(cart => {
            return res.json(cart);
        })
    },
    
    updateCartByEmail(req, res) {
        queries.updateCartEmail(req.params.email, req.body.cost).then(cart => {
            res.json(cart);
        })
    },
    
    removeCart(req, res) {
        queries.deleteCart(req.params.email).then(() => {
            return res.json({
                message: 'Cart removed'
            });
        })
    }
};

module.exports = Sales;