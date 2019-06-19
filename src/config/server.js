const http = require('http')

const log = require('../utils/logger').getInstance('server')

class Server {
  constructor (app) {
    this.server = http.createServer(app)
  }

  start (port) {
    this.server.listen(port)
    this.server.on('listening', () => this.onListening(this.server.address()))
    this.server.on('error', this.onError)
  }

  onListening ({ port, address }) {
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
