const BaseError = require('./BaseError');
const HttpStatusCode = require('../constants/httpStatusCodes');

class APIError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'internal server error', isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

module.exports = APIError;
