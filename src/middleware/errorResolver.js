const errorHandler = require('../utils/ErrorHandler');

const errorResolver = async (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    res.status(500).json({
      message: 'Server Error',
    })
  } else {
    err.setRequestInfo(req.method, req.url, { ...req.body });
    await errorHandler.handleError(err);
    res
      .status(err.httpCode)
      .json({
        message: err.message,
      });
  }
};

module.exports = errorResolver;