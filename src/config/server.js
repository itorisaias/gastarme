const http = require('http')

const log = require('../utils/logger').getInstance('server')

class Server {
  constructor (app) {
    this.server = http.createServer(app)
    this.server.on('listening', this.onListening)
    this.server.on('error', this.onError)
  }

  start (port) {
    this.server.listen(port)
  }

  onListening () {
    const {
      address,
      port
    } = this.server.address()

    log.info(`listening ${address}:${port}`)
  }

  onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    log.error(error)
    process.exit(1)
  }
}

module.exports = Server
