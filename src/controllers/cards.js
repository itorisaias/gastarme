class CardsController {
  constructor (CreditCardService) {
    this.CreditCardService = CreditCardService
  }

  create (req, res, next) {
    const { id } = req.decoded

    return this.CreditCardService
      .create(id, req.body)
      .then(() => res.status(201).send())
      .catch(next)
  }

  delete (req, res, next) {
    const {
      decoded: {
        id: idUser
      },
      params: {
        card_id: idCard
      }
    } = req

    return this.CreditCardService
      .destroy(idUser, idCard)
      .then(() => res.status(204))
      .catch(next)
  }

  findAll (req, res, next) {
    const { id } = req.decoded

    return this.CreditCardService
      .findAllByUser(id)
      .then(cards => res.send(cards))
      .catch(next)
  }
}

module.exports = CardsController
