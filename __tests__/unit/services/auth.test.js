const AuthService = require('../../../src/services/auth')
const factore = require('../../factore')
const truncate = require('../../utils/truncate')

describe('Service: Auth', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('authenticate', () => {
    it('should autenticate a user', async () => {
      const user = await factore.create('User')
      const userModelMock = {
        findOne: jest.fn().mockResolvedValue(user)
      }
      const authService = new AuthService(userModelMock)

      authService
        .authenticate(user)
        .then(result => expect(result).toEqual(user))
    })
    it('should return false when the password does not match', async () => {
      const user = await factore.create('User', {
        password: '123456'
      })
      const userModelMock = {
        findOne: jest.fn().mockResolvedValue(user)
      }
      const authService = new AuthService(userModelMock)

      authService
        .authenticate({ password: '654321' })
        .then(result => expect(result).toBe(false))
    })
    it('should return false when not found user', () => {
      const userModelMock = {
        findOne: jest.fn().mockResolvedValue()
      }
      const authService = new AuthService(userModelMock)

      authService
        .authenticate({})
        .then(result => expect(result).toBe(false))
    })
  })
  describe('recoveryPassword', () => {
    it('should recovery password', async () => {
      const userFake = await factore.create('User')
      const userModelMock = {
        findOne: jest.fn().mockResolvedValue(userFake),
        update: jest.fn().mockResolvedValue([1])
      }
      const authService = new AuthService(userModelMock)

      authService
        .recoveryPassword(userFake.email)
        .then(result => expect(result).toBe(true))
    })
    it('should return false when the email not found', () => {
      const userModelMock = {
        findOne: jest.fn().mockResolvedValue()
      }
      const authService = new AuthService(userModelMock)

      authService
        .recoveryPassword(null)
        .then(result => expect(result).toBe(false))
    })
  })
})
