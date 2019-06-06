const Joi = require('joi')

module.exports = {
  validate: (schema, local = 'body') => {
    return (req, res, next) => {
      const {
        error
      } = Joi.validate(req[local], schema, {
        abortEarly: false
      })

      if (error !== null) {
        const errors = error.details.map(detail => detail.message.replace(/[^\w\s]/gi, ''))
        return res.status(400).json({
          errors
        })
      }

      return next()
    }
  },
  schemaValidatorLogin: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}
