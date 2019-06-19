const faker = require('faker')
const generator = require('creditcard-generator')
const moment = require('moment')
const factory = require('factory-girl').factory
const {
  User,
  Card
} = require('../src/database/models')

const BRAND_DEFAULTS = ['VISA', 'MasterCard']
const brand = () => BRAND_DEFAULTS[Math.floor(Math.random() * BRAND_DEFAULTS.length)]

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define('Card', Card, {
  number: generator.GenCC(brand())[0],
  holder_name: faker.name.findName(),
  expiration: moment(faker.date.future()).format('MM/YY'),
  security_code: faker.random.number({ min: 0, max: 999, precision: 3 }),
  limit: faker.finance.amount(),
  brand: brand(),
  active: faker.random.boolean(),
  user_id: faker.random.number({ precision: 3 })
})

module.exports = factory
