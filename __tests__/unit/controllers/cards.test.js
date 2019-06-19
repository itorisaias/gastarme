const CardsController = require('../../../src/controllers/cards')
const factory = require('../../factore')

describe('Controller: Cards', () => {
  describe('registre card', () => {
    it('should insert card for user', async () => {
      const cardsServiceMock = {
        create: jest.fn().mockResolvedValue()
      }
      const cardController = new CardsController(cardsServiceMock)

      const req = {
        body: {},
        decoded: {
          id: 1
        }
      }
      const res = {
        send: jest.fn(),
        status: jest.fn()
      }
      res.status.mockReturnValue(res)

      await cardController.create(req, res, null)

      expect(res.send.mock.calls).toHaveLength(1)
      expect(res.status.mock.calls[0][0]).toBe(201)
    })
    it('should call next when throw error', async () => {
      const cardsServiceMock = {
        create: jest.fn().mockRejectedValue()
      }
      const cardController = new CardsController(cardsServiceMock)

      const req = {
        body: {},
        decoded: {
          id: 1
        }
      }
      const next = jest.fn()

      await cardController.create(req, null, next)

      expect(next.mock.calls).toHaveLength(1)
    })
  })
  describe('drop card', () => {
    it('should remove card of user', async () => {
      const cardsServiceMock = {
        deregister: jest.fn().mockResolvedValue()
      }
      const cardController = new CardsController(cardsServiceMock)

      const req = {
        decoded: {
          id: 1
        },
        params: {
          id: 1
        }
      }
      const res = {
        status: jest.fn()
      }

      await cardController.delete(req, res, null)

      expect(res.status.mock.calls[0][0]).toBe(204)
    })

    it('should call next when throw error', async () => {
      const cardsServiceMock = {
        deregister: jest.fn().mockRejectedValue()
      }
      const cardController = new CardsController(cardsServiceMock)

      const req = {
        decoded: {
          id: 1
        },
        params: {
          id: 1
        }
      }
      const next = jest.fn()

      await cardController.delete(req, null, next)

      expect(next.mock.calls).toHaveLength(1)
    })
  })
  describe('list card active user', () => {
    it('should ', async () => {
      const card = await factory.create('Card')
      const cardsServiceMock = {
        findAllByUser: jest.fn().mockResolvedValue([card])
      }
      const cardsController = new CardsController(cardsServiceMock)
      const req = {
        decoded: {
          id: null
        }
      }
      const res = {
        send: jest.fn()
      }

      await cardsController.getAll(req, res, null)

      expect(res.send.mock.calls[0][0]).toEqual([card])
    })
  })
})
