const userService = require('../services/users')

module.exports = {
  find: async (req, res, next) => {
    try {
      const users = await userService.fetchAll(req.query)
      return res.status(200).json(users)
    } catch (error) {
      return next(error)
    }
  },
  findOne: async (req, res, next) => {
    try {
      const user = await userService.fetch(req.params.id)
      return res.status(200).json(user)
    } catch (error) {
      return next(error)
    }
  },
  create: async (req, res, next) => {
    try {
      const userNew = await userService.add(req.body)
      return res.status(200).json(userNew)
    } catch (error) {
      return next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      const userUpdated = await userService.edit(req.params.id, req.body)
      return res.status(200).json(userUpdated)
    } catch (error) {
      return next(error)
    }
  },
  destroy: async (req, res, next) => {
    try {
      await userService.remove(req.params.id)
      return res.status(200).json()
    } catch (error) {
      return next(error)
    }
  }
}
