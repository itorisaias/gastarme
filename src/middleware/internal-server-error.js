const {
  ValidationError
} = require('sequelize')

function handleError (errors) {
  const listaErros = []

  if (errors === undefined || errors === null) {
    return listaErros
  }

  if (typeof errors === 'string') {
    listaErros.push(extrairMensagem(errors))
  } else if (typeof errors === 'object') {
    if (errors instanceof ValidationError) {
      errors.errors.forEach((error) => {
        listaErros.push(error.message)
      })
    } else if (errors instanceof Error) {
      listaErros.push(errors.message)
    } else if (errors instanceof Array) {
      errors.forEach((error) => {
        listaErros.push(handleError(error).toString())
      })
    } else {
      Object.keys(errors).forEach((key) => {
        listaErros.push(`${key}: ${errors[key]}`)
      })
    }
  }

  if (listaErros.length === 0) {
    listaErros.push('ERROR_DEFAULT')
  }

  return listaErros
}

function extrairMensagem (error) {
  if (error.message) {
    return error.message
  } else if (error.error || error.err || error.errors) {
    return error.error || error.err || error.errors
  }

  return new Error(error).message || 'Não conseguimos extrair o erro'
}

function internalServerError (err, req, res, next) {
  res.status(err.statusCode || 400).json({
    errors: handleError(err)
  })
}

module.exports = () => internalServerError
