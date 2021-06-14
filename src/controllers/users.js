const express = require('express');
const {UserUpdateSchema, UserCreateSchema} = require('../schemas/UserSchema');
const {createValidator} = require('express-joi-validation');
const UserService = require('../services/UserService');
const router = express.Router();
const HttpStatusCode = require('../constants/httpStatusCodes');

const validator = createValidator();

router
  .get('', async (req, res, next) => {
    try {
      const {loginSubstring, limit} = req.query;

      const promise = loginSubstring
        ? UserService.getAutoSuggestUsers(loginSubstring, limit)
        : UserService.getUsers();

      promise
        .then((users) => {
          res.status(HttpStatusCode.OK).json(users);
        })
        .catch(next);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', (req, res, next) => {
    UserService.getUsers(req.params.id)
      .then((user) => {
        res.status(HttpStatusCode.OK).json(user);
      })
      .catch(next);
  })
  .post('', validator.body(UserCreateSchema), async (req, res, next) => {
    UserService.createUser(req.body)
      .then((createdUser) => {
        res.status(HttpStatusCode.OK).json(createdUser);
      })
      .catch(next);
  })
  .put('', validator.body(UserUpdateSchema), async (req, res, next) => {
    UserService.updateUser(req.body)
      .then(() => {
        res.sendStatus(HttpStatusCode.OK);
      })
      .catch(next);
  })
  .delete('/:id', async (req, res, next) => {
    UserService.softDeleteUser(req.params.id)
      .then(() => {
        res.sendStatus(HttpStatusCode.OK);
      })
      .catch(next);
  });

module.exports = router;
