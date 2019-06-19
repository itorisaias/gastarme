const router = require('express').Router()
const axios = require('axios')
const ProductService = require('../services/product')
const ProductController = require('../controllers/products')

const productService = new ProductService(axios)
const productController = new ProductController(productService)

router
  .get('/', (req, res, next) => productController.findAll(req, res, next))
  .get('/:id', (req, res, next) => productController.findOne(req, res, next))

module.exports = router
