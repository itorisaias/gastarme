class CardService {
  constructor (CardModel) {
    this.CardModel = CardModel
  }

  create (userId, card) {
    return this.CardModel
      .create({ user_id: userId, ...card })
  }

  deregistre (userId, cardId) {
    return this.CardModel
      .update({
        active: false
      }, {
        where: {
          user_id: userId,
          id: cardId
        }
      })
      .then(rowsUpdated => {
        // Tratar caso não atualizar
        if (rowsUpdated[0] >= 1) {
          return true
        }
      })
  }
}

module.exports = CardService
