const routes = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./users')
const cardRouter = require('./cards')

routes.use('/auth', authRouter)
routes.use('/users', userRouter)
routes.use('/cards', cardRouter)

module.exports = routes
