import queries from '../models/queries';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = {
    login(req, res) {
        const 
            uEmail = req.body.email,
            uPassword = req.body.password;

        queries.getUser(uEmail).then(aUser => {
            if(aUser) {
                bcrypt.compare(uPassword, aUser.password, (err, response) => {
                    if(response) {
                        jwt.sign({
                                email: aUser.email,
                                previlledge: aUser.previlledge
                            },
                            'theadminisgreat',
                            {
                                expiresIn: '1d'
                            }, (err, token) => {
                                if(token) {
                                    return res.json(token);
                                }
                                if(err) {
                                    res.json({
                                        message: 'No token available'
                                    });
                                }
                            });
                    } else {
                        res.json({
                            message: "Wrong username or password"
                        })
                    }
                });    
            } else {
                res.json({
                    message: "Wrong username or password"
                })
            } 
        });
    },

    addUser(req, res) {
        const email = req.body.email;
        const previlledge = req.body.previlledge;

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
                return res.json({
                    message: err
                })
            }

            const userData = {
                email: email,
                password: hash,
                previlledge: previlledge
            }
            queries.addUser(userData).then(user => {
                res.json(user[0]);
            })
        });

    }
};

module.exports = User;