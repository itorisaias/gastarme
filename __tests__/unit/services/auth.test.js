const AuthService = require('../../../src/services/auth')
const factore = require('../../factore')
const truncate = require('../../utils/truncate')

describe('Service: Auth', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('authenticate', () => {
    it('should autenticate a user', async () => {
      const userFake = await factore.create('User')
      const userModelFake = {
        findOne: jest.fn().mockResolvedValue(userFake)
      }
      const data = {}
      const authService = new AuthService(userModelFake)

      authService
        .authenticate(data)
        .then(result => expect(result).toEqual(userFake))
    })
    it('should return false when the password does not match', () => {
      const userModelFake = {
        findOne: jest.fn().mockResolvedValue()
      }
      const data = {}
      const authService = new AuthService(userModelFake)

      authService
        .authenticate(data)
        .then(result => expect(result).toBe(false))
    })
  })
  describe('recoveryPassword', () => {
    it('should recovery password', async () => {
      const userFake = await factore.create('User')
      const userModelFake = {
        findOne: jest.fn().mockResolvedValue(userFake),
        update: jest.fn().mockResolvedValue([1])
      }
      const authService = new AuthService(userModelFake)

      authService
        .recoveryPassword(userFake.email)
        .then(result => expect(result).toHaveLength(1))
    })
    it('should return false when the email not found', () => {
      const userModelFake = {
        findOne: jest.fn().mockResolvedValue()
      }
      const authService = new AuthService(userModelFake)

      authService
        .recoveryPassword(null)
        .then(result => expect(result).toBe(false))
    })
  })
})
