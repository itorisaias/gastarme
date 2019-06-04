const router = require('express').Router()

const UserController = require('../controllers/users')
const { User } = require('../database/models')

const userController = new UserController(User)

router
  .route('/:id')
  .get((req, res, next) => userController.getById(req, res, next))
  .put((req, res, next) => userController.update(req, res, next))

module.exports = router
