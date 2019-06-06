const Logger = require('../../../src/utils/logger').Logger

describe('Utils: Logger', () => {
  describe('getInstance', () => {
    it('should create new instance logger', () => {
      const info = jest.fn()
      const libMock = {
        createLogger: jest.fn().mockReturnValue({
          info
        })
      }
      const logger = new Logger(libMock)

      const log = logger.getInstance('test')

      log.info('Hello')

      expect(info.mock.calls[0][0]).toEqual('Hello')
      expect(info.mock.calls[0]).toHaveLength(1)
    })
  })
})
