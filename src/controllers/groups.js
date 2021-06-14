const express = require('express');
const {GroupUpdateSchema, GroupCreateSchema, UserGroupCreateSchema} = require('../schemas/GroupSchema');
const {createValidator} = require('express-joi-validation');
const GroupService = require('../services/GroupService');
const HttpStatusCode = require('../constants/httpStatusCodes');
const router = express.Router();

const validator = createValidator();

router
  .get('', (req, res, next) => {
    GroupService.getGroups()
      .then((groups) => {
        res.status(HttpStatusCode.OK).json(groups);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    GroupService.getGroups(req.params.id)
      .then((group) => {
        res.status(HttpStatusCode.OK).json(group);
      })
      .catch(next);
  })
  .post('', validator.body(GroupCreateSchema), (req, res, next) => {
    GroupService.createGroup(req.body)
      .then((createdUser) => {
        res.status(HttpStatusCode.OK).json(createdUser);
      })
      .catch((error) => {
        next(error);
      });
  })
  .put('', validator.body(GroupUpdateSchema), (req, res, next) => {
    GroupService.updateGroup(req.body)
      .then(() => {
        res.sendStatus(HttpStatusCode.OK);
      })
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    GroupService.deleteGroup(req.params.id)
      .then(() => {
        res.sendStatus(HttpStatusCode.OK);
      })
      .catch(next);
  })
  .put('/:id/users', validator.body(UserGroupCreateSchema), (req, res, next) => {
    GroupService.addUsersToGroup(req.params.id, req.body)
      .then(() => {
        res.sendStatus(HttpStatusCode.OK);
      })
      .catch((e) => {
        next(e);
      });
  });

module.exports = router;
