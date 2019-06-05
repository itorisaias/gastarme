const AuthController = require('../../../src/controllers/auth')
const truncate = require('../../utils/truncate')
const factory = require('../../factore')

describe('Controller: Auth', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('signIn', () => {
    it('should authenticate a user', async () => {
      const userFake = await factory.create('User', {
        password: '123456'
      })
      class AuthServiceFake {
        authenticate () {
          return Promise.resolve(userFake)
        }
      }
      const req = {
        body: {
          email: userFake.email,
          password: '123456'
        }
      }
      const res = {
        send: jest.fn()
      }

      const authController = new AuthController(null, new AuthServiceFake())

      await authController.signIn(req, res, null)

      expect(res.send.mock.calls).toHaveLength(1)
      expect(res.send.mock.calls[0][0]).toHaveProperty('token')
    })
    it('should return 401 then theres no user', async () => {
      class AuthServiceFake {
        authenticate () {
          return Promise.resolve(false)
        }
      }
      const req = {
        body: null
      }
      const res = {
        sendStatus: jest.fn()
      }

      const authController = new AuthController(null, new AuthServiceFake())

      await authController.signIn(req, res, null)

      expect(res.sendStatus.mock.calls).toHaveLength(1)
      expect(res.sendStatus.mock.calls[0][0]).toBe(401)
    })
    it('should call next when throw error', async () => {
      class AuthServiceFake {
        authenticate () {
          return Promise.reject(new Error())
        }
      }
      const fakeReq = {
        body: null
      }
      const fakeNext = jest.fn()

      const authController = new AuthController(null, new AuthServiceFake())

      await authController.signIn(fakeReq, null, fakeNext)

      expect(fakeNext.mock.calls).toHaveLength(1)
    })
  })

  describe('signUp', () => {
    it('should call send with a new user', async () => {
      const userFake = await factory.attrs('User')
      const userModelFake = {
        create: (body) => Promise.resolve(body)
      }
      const authController = new AuthController(userModelFake, null)
      const req = { body: userFake }
      const res = {
        status: jest.fn(),
        send: jest.fn()
      }
      res.status.mockReturnValue(res)

      await authController.signUp(req, res, null)

      expect(res.status.mock.calls).toHaveLength(1)
      expect(res.status.mock.calls[0][0]).toBe(201)
      expect(res.send.mock.calls).toHaveLength(1)
      expect(res.send.mock.calls[0][0]).toBe(userFake)
    })
    it('should call next when throw error', async () => {
      const userModelFake = {
        create: jest.fn().mockRejectedValue(new Error())
      }
      const req = { body: null }
      const next = jest.fn()
      const authController = new AuthController(userModelFake, null)

      await authController.signUp(req, null, next)

      expect(next.mock.calls).toHaveLength(1)
    })
  })

  describe('recoveryPassword', () => {
    it('should return 200 with email existing', async () => {
      class AuthServiceFake {
        recoveryPassword () {
          return Promise.resolve(true)
        }
      }
      const req = { body: { email: null } }
      const res = {
        send: jest.fn()
      }
      const authController = new AuthController(null, new AuthServiceFake())

      await authController.recoveryPassword(req, res, null)

      expect(res.send.mock.calls).toHaveLength(1)
    })
    it('should return 404 without email existing', async () => {
      class AuthServiceFake {
        recoveryPassword () {
          return Promise.resolve(false)
        }
      }
      const req = { body: { email: null } }
      const res = {
        sendStatus: jest.fn()
      }
      const authController = new AuthController(null, new AuthServiceFake())

      await authController.recoveryPassword(req, res, null)

      expect(res.sendStatus.mock.calls).toHaveLength(1)
      expect(res.sendStatus.mock.calls[0][0]).toBe(404)
    })
    it('should call next when throw error', async () => {
      class AuthServiceFake {
        recoveryPassword () {
          return Promise.reject(new Error())
        }
      }
      const req = { body: { email: null } }
      const next = jest.fn()
      const authController = new AuthController(null, new AuthServiceFake())

      await authController.recoveryPassword(req, null, next)

      expect(next.mock.calls).toHaveLength(1)
    })
  })
})
