const faker = require('faker')
const factory = require('factory-girl').factory
const {
  User
} = require('../src/database/models')

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

module.exports = factory
