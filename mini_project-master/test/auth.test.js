const chai = require('chai')
const chaihttp = require('chai-http')
const { response } = require('express')
const server = require('../server')

chai.should()

chai.use(chaihttp)

describe('Auth', () => {
    describe('GET /alllogin', () => {
        it('It should get all the login', (done) => {
            chai.request(server)
                .get('/alllogin')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array')
                    response.body.length.should.be.equal(5)
                    // response.body.should.have.property('username')
                done()
                })
        })
    })

    // DELETE
    describe('DELETE /user/remove/:id', () => {
        it('It should can\'t delete login by id', (done) => {
            const id = '614c88d8d252424b1f0522c3'//6
            chai.request(server)
                .delete('/user/remove/' + id)
                .end((err, response) => {
                    response.text.should.be.eq('User not found')
                done()
                })
        })
    })

    describe('POST /login', () => {
        it('It should be passed', (done) => {
            const user = {
                "password": "test",
                "email": "test@vmodev.com"
            }
            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object')
                    response.body.should.have.property("token")
                    done()
                })
        })
    })
})