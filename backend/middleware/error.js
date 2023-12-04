const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  if (err.code === 11000) {
    const message = 'Email just Exist'
    error = new ErrorResponse(message, 200)
  }
  if (err.name === 'validationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 200)
  }
  if (err.code === 'E11000') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 200)
  }

  return res.status(error.statusCode || 404).json(error.message || 'Server Error')
}

module.exports = errorHandler
