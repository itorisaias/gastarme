const http = require('http')
const app = require('./app')

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
  console.log(`listenig in ${address}:${port}`)
}

function onError (error) {
  console.log(error)
}

module.exports = {
  start
}
