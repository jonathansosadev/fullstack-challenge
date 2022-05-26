const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../server.js')

chai.should();

chai.use(chaiHttp);

describe('APIRest Tests', () => {
    describe('GET /files/list', () => {
        it('it shoul get all of files name', (done) => {
            chai.request(server)
                .get('/files/list')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                }) 
        })
    })

    describe('GET /files/data', () => {
        it('it shoul get all correct data of files in te external server', (done) => {
            chai.request(server)
                .get('/files/data')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                }) 
        })
    })

    describe('GET /files/data?fileName=test6.csv', () => {
        it('it shoul get all correct data of a file name filter in te external server', (done) => {
            chai.request(server)
                .get('/files/data?fileName=test6.csv')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                }) 
        })
    })
})