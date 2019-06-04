class UsersController {
  constructor (UserModel) {
    this.UserModel = UserModel
  }

  getById (req, res, next) {
    const { params: { id } } = req

    return this.UserModel
      .findOne({ where: { id } })
      .then(user => res.send(user))
      .catch(next)
  }

  update (req, res, next) {
    const { params: { id } } = req
    return this.UserModel
      .update(req.body, { where: { id } })
      .then(() => res.sendStatus(200))
      .catch(next)
  }
}

module.exports = UsersController
