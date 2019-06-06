const winston = require('winston')

class Logger {
  constructor (lib = winston) {
    this.lib = lib
  }

  getInstance (nameService) {
    const level = this.getLevel(process.env.NODE_ENV)

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

    return logger
  }

  getLevel (env) {
    switch (env) {
      case 'test':
        return 'error'
      case 'production':
        return 'info'
      case 'staging':
        return 'info'
      case 'development':
        return 'debug'
      default:
        return 'silly'
    }
  }
}

module.exports = new Logger(winston)
module.exports.Logger = Logger
