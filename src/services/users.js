module.exports = {
  fetchAll: async (params) => {
    return []
  },
  fetch: async (params) => {
    return {}
  },
  add: async (values) => {
    return values
  },
  edit: async (params, values) => {
    return {
      ...values,
      ...params
    }
  },
  remove: async (params) => {
    return true
  },
  search: async (params) => {
    return []
  }
}
