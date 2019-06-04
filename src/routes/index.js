const routes = require('express').Router()
const userRouter = require('./users')

routes.use('/users', userRouter)

module.exports = routes
