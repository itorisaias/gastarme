const http = require('http')

const app = require('./app')
const log = require('../helpers/logger').create('server')

const server = http.createServer(app)

server.on('listening', onListening)
server.on('error', onError)

function start (port) {
  server.listen(port)
}

function onListening () {
  const {
    address,
    port
  } = server.address()

  log.info(`listening ${address}:${port}`)
}

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  log.error(error.message, ...error)
  process.exit(1)
}

module.exports = {
  start
}
