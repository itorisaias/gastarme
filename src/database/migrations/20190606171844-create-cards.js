'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      holder_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiration: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      security_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      limit: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards')
  }
}
