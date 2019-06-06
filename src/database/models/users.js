const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
        fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'The email you entered is invalid or is already in our system.'
        },
        max: {
          args: 254,
          msg: 'The email you entered is invalid or longer than 254 characters.'
        }
      }
    },
    recovery_code: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    recovery_code_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
          delete user.password
        }
      }
    }
  })

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({
      id: this.id,
      role: this.role
    }, process.env.APP_SECRET)
  }

  return User
}
