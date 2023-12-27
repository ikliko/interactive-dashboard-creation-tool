const supertest = require('supertest')
const chai = require('chai')
const app = require('../index') // Replace with the path to your Express app file

const expect = chai.expect
const request = supertest(app)

describe('API Tests', () => {
    describe('Users', () => {
        it('Register user', async () => {
            const user = {
                email: 'test@email.com',
                name: 'Test User'
            }

            const response = await request.post('/users').send(user)

            expect(response.status).to.equal(200)
            expect(response.type).to.equal('application/json')
            expect(response.body).to.have.property('data')
            expect(response.body).to.deep.equal({
                data: {
                    ...user,
                    password: 'test123'
                }
            })
        })

        it('Login user', async () => {
            const email = 'test@email.com'

            const response = await request.post('/users').send({
                email,
                password: 'test123'
            })

            expect(response.status).to.equal(200)
            expect(response.type).to.equal('application/json')
            expect(response.body).to.have.property('data')
            expect(response.body).to.have.property('data.email', email)
            expect(response.body).to.have.property('data._id')
            expect(response.body).to.have.property('data.accessToken')
        })

        it('Forgotten password', async () => {
            const email = 'test@email.com'
            const response = await request.post('/password/forgotten').send({email})

            expect(response.status).to.equal(200)
            expect(response.type).to.equal('application/json')
            expect(response.body).to.have.property('data')
            expect(response.body).to.have.property('data.message', 'Email with further instructions has been sent')
        })

        it('Reset password', async () => {
            const response = await request.post('/users').send({
                code: '1234',
                password: 'test123'
            })

            expect(response.status).to.not.equal(404)
            expect(response.type).to.equal('application/json')
        })
    })

    after(() => {
        app.close()
    })
})
