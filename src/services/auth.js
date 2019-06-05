class AuthService {
  constructor (UserModel) {
    this.UserModel = UserModel
  }

  authenticate (data) {
    const { email, password } = data
    return this.UserModel
      .findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return false
        }
        return user
          .checkPassword(password)
          .then(passwordValid => passwordValid ? user : false)
      })
  }

  recoveryPassword (email) {
    return this.UserModel
      .findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return false
        }

        const code = Math.floor(Math.random() * 1000000)

        return this.UserModel
          .update({
            recovery_code: code,
            recovery_code_at: new Date()
          },
          {
            where: { email }
          })
      })
      .then(rowsUpdated => (rowsUpdated[0] >= 1))
  }
}

module.exports = AuthService
