const path = require('path')
const winston = require('winston')

const env = process.env.NODE_ENV || 'development'
const level = env === 'production' ? 'info' : 'silly'

class Logger {
  constructor (lib = winston) {
    this.lib = lib
  }

  getInstance (nameService) {
    const logger = this.lib.createLogger({
      level,
      format: winston.format.json(),
      defaultMeta: {
        service: nameService
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
}

module.exports = new Logger(winston)
