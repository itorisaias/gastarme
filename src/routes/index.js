const router = require('express').Router()

const authRouter = require('./auth')
const cardRouter = require('./cards')
const productRouter = require('./products')
const transactionRouter = require('./transactions')

router.use('/auth', authRouter)
router.use('/cards', cardRouter)
router.use('/products', productRouter)
router.use('/transactions', transactionRouter)

module.exports = router
