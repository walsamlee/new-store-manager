import knex from '../models/knex';
import request from 'supertest';
import { expect } from 'chai';
import testdata from './testdata'

import http from 'node-mocks-http';
import Auth from '../middlewares/Auth';
import Product from '../controllers/Product';

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

    it('Add product', (done) => {
        request(app)
            .post('/api/v1/products')
            .send(testdata.product)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body).to.be.a('object');
                }
            })

            done();
    });

    it('verifyAdmin status should be 200', (done) => {
        const req = http.createRequest({
            headers: {
                token: 1
            }
        });

        const res = http.createResponse();
        const next = () => {};

        Auth.verifyAdmin(req, res, next);

        expect(res.statusCode).to.be.equal(200);
        
        done();
    });

    it('verifyAttendant status should be 200', (done) => {
        const req = http.createRequest({
            headers: {
                token: 0
            }
        });

        const res = http.createResponse();
        const next = () => {};

        Auth.verifyAttendant(req, res, next);

        expect(res.statusCode).to.be.equal(200);
        
        done();
    });

    it('should add product', (done) => {
        const req = http.createRequest({
            body: testdata.product
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
            .expect('Content-type', /json/)
            .expect(401)
            .end((err, response) => {
                if(err) throw err;
                else {
                    expect(response.body).to.be.a('object');
                }
                
                done();
            })
    })
})