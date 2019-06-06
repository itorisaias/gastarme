const Server = require('./config/server')
const app = require('./config/app')

const server = new Server(app)
server.start(process.env.PORT || 3000)
