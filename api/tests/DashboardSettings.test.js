const supertest = require('supertest')
const chai = require('chai')
const app = require('../index') // Replace with the path to your Express app file

const expect = chai.expect
const request = supertest(app)

describe('API Tests', () => {
    describe('Dashboard settings', () => {
        it('Get configuration not auth', async () => {
            const user = {
                email: 'test@email.com',
                name: 'Test User'
            }

            const response = await request.get('/settings').send()

            expect(response.status).to.equal(403)
            expect(response.type).to.equal('application/json')
            expect(response.body).to.have.property('data')
        })

        it('Get configuration', async () => {
            const user = {
                email: 'test@email.com',
                name: 'Test User'
            }

            const response = await request.get('/settings').send()

            expect(response.status).to.equal(200)
            expect(response.type).to.equal('application/json')
            expect(response.body).to.have.property('data')
        })
    })

    after(() => {
        app.close()
    })
})
