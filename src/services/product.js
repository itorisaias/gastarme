class ProductService {
  constructor (axios) {
    this.axios = axios.create({
      baseURL: 'http://5cfd60c6a954a70014032bf6.mockapi.io/api'
    })
  }

  findAll () {
    return this.axios
      .get('/v1/products')
      .then(response => response.data)
  }

  findOne (id) {
    return this.axios
      .get(`/v1/products/${id}`)
      .then(response => response.data)
  }
}

module.exports = ProductService
