const BaseError = require('./BaseError');
const logger = require('./Logger');

class ErrorHandler {
  handleError(error) {
    logger.error(
      'Global handler --',
      error,
    );
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }

    return false;
  }
}

module.exports = new ErrorHandler();
