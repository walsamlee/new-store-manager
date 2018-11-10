import client from '../models/db';

const Sales = {
    viewSalesById(req, res) {
        const sales_id = parseInt(req.params.salesId, 10);
        const token = parseInt(req.headers.token, 10);
        const headerId = parseInt(req.headers.id, 10);
        let thisSale;

        const query = {
            text: 'SELECT * FROM sales WHERE id = $1',
            values: [sales_id]
        };

        client.query(query, (err, result) => {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: 'Data cannot be loaded'
                })
            }

            if (result.rows[0] === undefined) {
                return res.status(404).send({
                    success: false,
                    message: `Sales with ID ${sales_id} not found`
                })
            }

            thisSale = result.rows[0];

            const thisSaleId = thisSale.attendant_id;

            if ((token === 1) || (thisSaleId === headerId)) {
                return res.status(200).send({
                    success: true,
                    message: 'Sales found',
                    data: thisSale
                })
            }else {
                res.status(401).send({
                    success: false,
                    message: 'Unauthorized to access route'
                })
            }

        });
    },

    viewSales(req, res) {
        client.query('SELECT * FROM sales', (err, result) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Sales records could not be retrieved',
                })
            }

            res.status(200).send({
                success: true,
                message: 'Sales records retrieved successfully',
                data: result.rows
            })
        })
    },

    createSales(req, res) {
        const
            attendant_id = req.body.attendant_id,
            attendant_email = req.body.attendant_email,
            date = req.body.date,
            sales = req.body.sales;

        let products = '', total = 0;

        for (let i = 0; i < sales.length; i++) {
            products += sales[i].product + ', ';
            total += sales[i].price;
        }

        const query = {
            text: 'INSERT INTO sales(attendant_id, attendant_email, date, products, total) VALUES($1, $2, $3, $4, $5)',
            values: [attendant_id, attendant_email, date, products, total],
        };

        client.query(query, (err, result) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Sales could not be recorded',
                })
            }

            res.status(200).send({
                success: true,
                message: 'Sales recorded successfully',
                data: [attendant_id, attendant_email, date, sales]
            })
        })

        /*client.query('SELECT * FROM products', (err, result) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Product could not be retrieved',
                })
            }

            const products_data = result.rows;

            res.status(200).send({

                success: true,
                message: 'Sales records retrieved successfully',
                data: sales
            })
        });*/
    }
};

module.exports = Sales;