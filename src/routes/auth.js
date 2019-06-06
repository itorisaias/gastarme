const router = require('express').Router()

const { schemaValidatorLogin, validate } = require('./schemasValidators')
const AuthController = require('../controllers/auth')
const AuthService = require('../services/auth')
const { User } = require('../database/models')

const authController = new AuthController(User, new AuthService(User))

router
  .post('/sign_in', validate(schemaValidatorLogin), (req, res, next) => authController.signIn(req, res, next))
  .post('/sign_up', (req, res, next) => authController.signUp(req, res, next))

router
  .route('/recovery_password')
  .post((req, res, next) => authController.recoveryPassword(req, res, next))

module.exports = router
