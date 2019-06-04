const jwt = require('jsonwebtoken')

function authenticate (req, res, next) {
  const { authorization } = req.headers

  if (authorization) {
    const [, token] = authorization.split(' ')

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err !== null) {
        res.status(401).json({
          message: 'Token invalid'
        })
        return
      }

      req.decoded = decoded
      next()
    })
  }
}

module.exports = () => authenticate
