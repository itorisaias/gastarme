require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const acl = require('express-acl')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

const swaggerDocument = require('./swagger.json')
const routes = require('../routes')
const {
  logging,
  serverError
} = require('../middleware')

const app = express()

acl.config({
  baseUrl: '/api',
  path: 'src/config'
})

app.use(cors())
app.use(logging())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(acl.authorize.unless({
  path: [
    '/api/auth/sign_in',
    '/api/auth/sign_up',
    '/api/auth/recovery_password'
  ]
}))
app.use('/api', routes)
app.use(serverError())

module.exports = app
