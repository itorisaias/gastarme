require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

const swaggerDocument = require('./swagger.json')
const routes = require('../routes')
const {
  logging,
  serverError
} = require('../middleware')

const app = express()

app.use(cors())
app.use(logging())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', routes)
app.use(serverError())

module.exports = app
