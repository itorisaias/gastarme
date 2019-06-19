const moment = require('moment')
const validator = require('validator')

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    number: {
      type: DataTypes.STRING(16),
      validate: {
        validateCreditCard (value) {
          if (!validator.isCreditCard(value)) {
            throw new Error('card number invalid')
          }
        }
      }
    },
    holder_name: {
      type: DataTypes.STRING
    },
    expiration: {
      type: DataTypes.STRING(5),
      validate: {
        valiteDate (value) {
          if (!moment(`01/${value}`, 'DD/MM/YY').isAfter(new Date())) {
            throw new Error('expiraton date invalid')
          }
        }
      }
    },
    security_code: {
      type: DataTypes.STRING(3)
    },
    limit: {
      type: DataTypes.DECIMAL
    },
    brand: {
      type: DataTypes.ENUM,
      values: ['VISA', 'MasterCard', 'Amex', 'Diners', 'Discover', 'EnRoute', 'JCB', 'Voyager']
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  Card.associate = models => {
    Card.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  return Card
}
