const CardsService = require('../../../src/services/cards')
const factory = require('../../factore')
const truncate = require('../../utils/truncate')

describe('Services: Cards', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('registre', () => {
    it('should registrar o cartão para usuario que solicitou a requisição', async () => {
      const user = await factory.create('User')
      const card = await factory.attrs('Card', {
        user_id: user.id
      })
      const cardsModelMock = {
        create: jest.fn().mockResolvedValue(card)
      }
      const cardsService = new CardsService(cardsModelMock)

      const result = await cardsService.create(user.id, card)

      expect(cardsModelMock.create.mock.calls).toHaveLength(1)
      expect(result.user_id).toBe(user.id)
      expect(result.number).toBe(card.number)
    })
  })

  describe('deregistre', () => {
    it('should desativar o cartão', async () => {
      const card = await factory.create('Card')
      const cardsModelMock = {
        update: jest.fn().mockResolvedValue([ 1 ])
      }
      const cardsService = new CardsService(cardsModelMock)

      const result = await cardsService.deregistre(card.id)

      expect(result).toBe(true)
    })
  })
})
