import client from '../models/db';

const User = {
    login(req, res) {
        const uEmail = req.body.email;
        let aUser;
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            value: [uEmail]
        };

        client.query(query, (err, result) => {
            if(err) {
                res.status(404).send({
                    success: false,
                    message: 'Failed to load user'
                });
            }

            aUser = result.rows[0];

            if((aUser.email !== req.body.email) && (aUser.password !== req.body.password)) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            res.status(200).send({
                success: true,
                message: 'User found',
                data: aUser.email
            })
        })
    }
};

module.exports = User;