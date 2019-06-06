const request = require('supertest')
const app = require('../../../src/config/app')
const factory = require('../../factore')
const truncate = require('../../utils/truncate')

describe('Routes: /users', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('GET /users/:id', () => {
    it('should return a user', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(200)
    })
  })
})
