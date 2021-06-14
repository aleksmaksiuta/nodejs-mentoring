const express = require('express');
const router = express.Router();
const {createValidator} = require('express-joi-validation');
const AuthorizationService = require('../services/AuthorizationService');
const { AuthSchema } = require('../schemas/AuthSchema');
const HttpStatusCode = require('../constants/httpStatusCodes');

const validator = createValidator();

router
  .post('', validator.body(AuthSchema), (req, res, next) => {
    AuthorizationService.authorize(req.body.login, req.body.password)
      .then((token) => {
        res.setHeader('x-access-token', token);
        res.sendStatus(HttpStatusCode.OK);
      })
      .catch(next);
  });

module.exports = router;