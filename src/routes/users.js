const router = require('express').Router()
const userController = require('../controllers/users')

router
  .route('/')
  .post(userController.create)
  .get(userController.find)

router
  .route('/:id')
  .get(userController.findOne)
  .put(userController.update)
  .delete(userController.destroy)

module.exports = router
