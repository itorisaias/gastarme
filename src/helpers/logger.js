const path = require('path')
const winston = require('winston')

const env = process.env.NODE_ENV || 'development'
const level = env === 'production' ? 'info' : 'silly'

function create (serviceName) {
  const logger = winston.createLogger({
    level,
    format: winston.format.json(),
    defaultMeta: {
      service: serviceName
    },
    transports: [
      new winston.transports.Console()
    ]
  })

  if (env === 'development') {
    logger.add(
      new winston.transports.File({
        filename: 'gastarme.log',
        dirname: path.resolve(__dirname, '..', '..')
      })
    )
  }

  return logger
}

module.exports = {
  create
}
