class CardsService {
  constructor (CardsModel) {
    this.CardsModel = CardsModel
  }

  create (userId, card) {
    return this.CardsModel
      .create({ user_id: userId, ...card })
  }

  deregistre (cardId) {
    return this.CardsModel
      .update({ active: false }, { where: { id: cardId } })
      .then(rowsUpdated => {
        if (rowsUpdated[0] >= 1) {
          return true
        }
        return false
      })
  }
}

module.exports = CardsService
