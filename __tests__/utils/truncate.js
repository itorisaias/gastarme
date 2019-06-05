const {
  sequelize
} = require('../../src/database/models')

module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(key =>
      sequelize.models[key].destroy({
        truncate: true,
        force: true
      })
    )
  )
}
