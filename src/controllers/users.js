class UsersController {
  constructor (UserService) {
    this.UserService = UserService
  }

  findOne (req, res, next) {
    const { id } = req.params

    return this.UserService
      .findOne({ where: { id } })
      .then(user => res.send(user))
      .catch(next)
  }

  update (req, res, next) {
    const { params: { id } } = req

    return this.UserService
      .update(req.body, { where: { id } })
      .then(() => res.sendStatus(200))
      .catch(next)
  }
}

module.exports = UsersController
