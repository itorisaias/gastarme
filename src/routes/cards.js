const router = require('express').Router()
const CardsController = require('../controllers/cards')
const CardsService = require('../services/cards')
const { Card } = require('../database/models')

const cardsService = new CardsService(Card)
const cardsController = new CardsController(cardsService)

router
  .post('/', (req, res, next) => cardsController.create(req, res, next))
  .delete('/:id', (req, res, next) => cardsController.delete(req, res, next))

module.exports = router
