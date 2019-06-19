class ProductController {
  constructor (ProductService) {
    this.ProductService = ProductService
  }

  findAll (req, res, next) {
    const {
      page,
      limit,
      sortBy,
      order
    } = req.query

    return this.ProductService
      .findAll({ page, limit, sortBy, order })
      .then(products => res.send(products))
      .catch(next)
  }

  findOne (req, res, next) {
    const { id } = req.params

    return this.ProductService
      .findOne(id)
      .then(product => res.send(product))
      .catch(next)
  }
}

module.exports = ProductController
