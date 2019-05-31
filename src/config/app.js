const express = require('express')
const compression = require('compression')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports = app
