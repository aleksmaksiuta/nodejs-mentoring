const BaseError = require('./BaseError');
const HttpStatusCode = require('../constants/httpStatusCodes');

class AuthorizationError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.UNAUTHORIZED, description = 'Not Authorized', isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}
class ForbiddenError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.FORBIDDEN, description = 'Forbidden', isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

module.exports = {
  AuthorizationError,
  ForbiddenError,
};
