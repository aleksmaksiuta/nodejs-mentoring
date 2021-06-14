const jwt = require('jsonwebtoken');
const { ForbiddenError } = require('../utils/AuthError');
const HttpStatusCode = require('../constants/httpStatusCodes');
const config = require('../config');

const auth = (req, __, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    throw new ForbiddenError('Not authorized', HttpStatusCode.UNAUTHORIZED, 'Not authorized');
  }

  try {
    jwt.verify(token, config.secret);
    next();
  } catch (e) {
    throw new ForbiddenError('Token not valid', HttpStatusCode.FORBIDDEN, 'Expired');
  }
};

module.exports = auth;