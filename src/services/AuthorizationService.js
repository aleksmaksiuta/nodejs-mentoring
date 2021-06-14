const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../utils/AuthError');
const HttpStatusCode = require('../constants/httpStatusCodes');
const UserRepo = require('../repo/UserRepo');
const config = require('../config');


const authorize = (login, password) => UserRepo.getOne({ login }).then(userFound => {
  if (!userFound || userFound.password !== password || userFound.isDeleted) {
    throw new AuthorizationError('Authorization Error', HttpStatusCode.FORBIDDEN, 'login/password pair doesn\'t match');
  }

  return jwt.sign({
    id: userFound.id
  }, config.secret, { expiresIn: '5m' });
});

module.exports = {
  authorize,
};
