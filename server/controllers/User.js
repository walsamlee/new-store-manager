import queries from '../models/queries';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const User = {
    login(req, res) {
        const 
            uEmail = req.body.email,
            uPassword = req.body.password;

        if(uEmail === undefined || uPassword === undefined) {
            return res.json({
                message: "Invalid username or password"
            })
        }
        
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
                                expiresIn: '1y'
                            }, (err, token) => {
                                if(token) {
                                    return res.status(200).json({
                                        token: token,
                                        email: aUser.email
                                    });
                                }
                                if(err) {
                                    res.status(404).json({
                                        message: 'No token available'
                                    });
                                }
                            });
                    } else {
                        res.status(400).json({
                            message: "Wrong username or password"
                        })
                    }
                });    
            } else {
                res.status(400).json({
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
            };
            queries.postUser(userData).then(user => {
                return res.json(user[0]);
            });
        });

    },
    
    removeUser(req, res) {
        const email = req.params.email;
        queries.deleteUser(email).then(() => {
            res.json({
                message: `User with email ${email} deleted successfully`
            });
        })
    },
    
    editUser(req, res) {
        const email = req.params.email;
        const previlledge = req.body.previlledge;
    
        if(req.body.password) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.json({
                        message: err
                    })
                }
        
                const userData = {
                    password: hash,
                    previlledge: previlledge
                };
                queries.putUser(email, userData).then(user => {
                    return res.json(user[0]);
                })
            });
        } else {
            const userData = {
                previlledge: previlledge
            };
            queries.putUser(email, userData).then(user => {
                return res.json(user[0]);
            })
        }
    },
    
    viewUsers(req, res) {
        queries.getUsers().then(users => {
            return res.json(users)
        });
    },

    admin(req, res) {
        const token = req.userData.previlledge;
        
        return res.json(token);
    }
};

module.exports = User;