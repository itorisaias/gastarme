const request = require('supertest')
const truncate = require('../../utils/truncate')
const factore = require('../../factore')
const app = require('../../../src/config/app')

describe('Routes: /auth', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('POST /auth/sign_up', () => {
    it('should create a user', async () => {
      const user = await factore.attrs('User', {
        password: '123456'
      })
      const response = await request(app)
        .post('/api/auth/sign_up')
        .send(user)

      expect(response.status).toBe(201)
    })

    it('should return error when email is not valid', async () => {
      const user = await factore.attrs('User', {
        email: 'teste.com'
      })
      const response = await request(app)
        .post('/api/auth/sign_up')
        .send(user)

      expect(response.status).toBe(400)
      expect(response.body.errors).toHaveLength(1)
    })
  })
  describe('POST /auth/sign_in', () => {
    it('should authenticate with valid credentials', async () => {
      const user = await factore.create('User', { password: '123456' })

      const response = await request(app)
        .post('/api/auth/sign_in')
        .send({
          email: user.email,
          password: '123456'
        })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
    })
    it('should not authenticate with invalid credentials', async () => {
      const user = await factore.create('User', { password: '123456' })

      const response = await request(app)
        .post('/api/auth/sign_in')
        .send({
          email: user.email,
          password: '123'
        })

      expect(response.status).toBe(401)
    })
    it('should return error when not inform field required', async () => {
      const user = await factore.create('User', { password: '123456' })

      const response = await request(app)
        .post('/api/auth/sign_in')
        .send({
          email: user.email
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
    })
  })
})
