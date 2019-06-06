class AuthController {
  constructor (UserModel, AuthService) {
    this.UserModel = UserModel
    this.AuthService = AuthService
  }

  signIn (req, res, next) {
    return this.AuthService
      .authenticate(req.body)
      .then((user) => {
        if (!user) {
          return res.sendStatus(401)
        }
        const token = user.generateToken()
        return res.send({ token })
      })
      .catch(next)
  }

  signUp (req, res, next) {
    return this.UserModel
      .create(req.body)
      .then((user) => res.status(201).send(user))
      .catch(next)
  }

  recoveryPassword (req, res, next) {
    const { body: { email } } = req
    return this.AuthService
      .recoveryPassword(email)
      .then((result) => {
        if (!result) {
          return res.sendStatus(404)
        }
        return res.send()
      })
      .catch(next)
  }
}

module.exports = AuthController
