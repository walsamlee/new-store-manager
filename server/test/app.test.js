import knex from '../models/knex';
import request from 'supertest';
import { expect } from 'chai';
import testdata from './testdata'

import http from 'node-mocks-http';
import Auth from '../middlewares/Auth';
import Product from '../controllers/Product';
import User from '../controllers/User';

import app from '../app';

describe('CRUD store manager', () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run();
            })
            .then(() => done());
    });

    it('Show all products', (done) => {
        request(app)
            .get('/api/v1/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body).to.be.a('array');
                    expect((response.body).length).to.be.equal((testdata.products).length);
                }
                
                done();
            });
    });
    
    it('Show product by id', (done) => {
        request(app)
            .get('/api/v1/products/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body).to.be.a('object');
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('description');
                    expect(response.body).to.have.property('category');
                    expect(response.body).to.have.property('quantity');
                    expect(response.body).to.have.property('price');
                    expect(response.body).to.have.property('date');
                    expect(response.body).to.have.property('minimum');
                }               

                done();
            });
    });

    it('test /api/v1/products route', (done) => {
        request(app)
            .post('/api/v1/products')
            .send(testdata.product1)
            .set('Accept', 'application/json')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body).to.be.a('object');
                    expect(response.body).to.deep.equal(testdata.product1);
                }

                done();
            })

    });

    it('verifies admin token is decodable', (done) => {
        const adminTestDecode = {
            "email": "admin@store.com",
            "previlledge": 1,
            "iat": 1542811305,
            "exp": 1574368905
          }
        const req = http.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74"
            }
        });

        const res = http.createResponse();
        const next = () => {};

        Auth.verifyToken(req, res, next);
        
        expect(req.userData).to.deep.equal(adminTestDecode);
        
        done();
    });

    it('verifies attendant token is decodable', (done) => {
        const adminTestDecode = {
            "email": "store2@store.com",
            "previlledge": 0,
            "iat": 1542811107,
            "exp": 1574368707
          }
        const req = http.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0b3JlMkBzdG9yZS5jb20iLCJwcmV2aWxsZWRnZSI6MCwiaWF0IjoxNTQyODExMTA3LCJleHAiOjE1NzQzNjg3MDd9.7VKS-StyyrzKGRBNerHFqZY_4J62FpFPDaBQrdluxXw"
            }
        });

        const res = http.createResponse();
        const next = () => {};

        Auth.verifyToken(req, res, next);
        
        expect(req.userData).to.deep.equal(adminTestDecode);
        
        done();
    });

    it('verifies admin previlledge is equal to 1', (done) => {
        const req = http.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74"
            }
        });

        const res = http.createResponse();
        const next = () => {};

        Auth.verifyAdmin(req, res, next);

        expect(req.userData.previlledge).to.be.equal(1);
        
        done();
    });

    it('verifies attendant previlledge is equal to 0', (done) => {
        const req = http.createRequest({
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0b3JlMkBzdG9yZS5jb20iLCJwcmV2aWxsZWRnZSI6MCwiaWF0IjoxNTQyODExMTA3LCJleHAiOjE1NzQzNjg3MDd9.7VKS-StyyrzKGRBNerHFqZY_4J62FpFPDaBQrdluxXw"
            }
        });

        const res = http.createResponse();
        const next = () => {};

        Auth.verifyAttendant(req, res, next);
        
        expect(req.userData.previlledge).to.be.equal(0);
        
        done();
    });

    it('test addProduct function', (done) => {
        const req = http.createRequest({
            body: testdata.product2
        });

        const res = http.createResponse();

        Product.addProduct(req, res);
        expect(res.statusCode).to.be.equal(200);
        
        done();
    });

    it('should return sales', (done) => {
        request(app)
            .get('/api/v1/sales')
            .set('Accept', 'application/json')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body).to.be.a('array');
                    expect(response.body).to.deep.equal(testdata.sales);
                }
                
                done();
            });
    });

    it('test /auth/signup route', (done) => {
        request(app)
            .post('/auth/signup')
            .set('Accept', 'application/json')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN0b3JlLmNvbSIsInByZXZpbGxlZGdlIjoxLCJpYXQiOjE1NDI4MTEzMDUsImV4cCI6MTU3NDM2ODkwNX0.RRhRT1BMXyI8PW-oX6Vb_llVza_v2-B28V8H-wbAF74')
            .expect('Content-Type', /json/)
            .send(testdata.user2)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body.email).to.deep.equal(testdata.signupUser.email);
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body).to.be.a('object');
                }
                
                done();
            });

    })

    it('test addUser function', (done) => {
        const req = http.createRequest({
            body: testdata.user1
        });

        const res = http.createResponse();

        User.addUser(req, res);

        expect(res.statusCode).to.be.equal(200);

        done();
    });

    it('test /auth/login function', (done) => {
        request(app)
            .post('/auth/login')
            .send(testdata.loginUser)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, response) => {
                // console.log(response.body);
                if(err) {
                    throw err;
                }
                else {
                    expect(response.body).to.be.a('string');
                    expect(response.statusCode).to.be.equal(200);
                    
                }

                done();
            })
        
    })
});