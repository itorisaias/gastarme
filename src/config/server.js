const http = require('http')
const app = require('./app')

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

function onListening () {
  const { address, port } = server.address()
  console.log(`listenig in ${address}:${port}`)
}

function onError (error) {
  console.log(error)
}

function start () {
  server.listen(PORT)
}

server.on('listening', onListening)
server.on('error', onError)

module.exports = {
  start
}
