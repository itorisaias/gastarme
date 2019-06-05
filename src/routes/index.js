const routes = require('express').Router()

const userRouter = require('./users')
const authRouter = require('./auth')

routes.use('/users', userRouter)
routes.use('/auth', authRouter)

module.exports = routes
