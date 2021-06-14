const Joi = require('joi');
const PERMISSIONS = require('../constants/permissions');

const GroupCreateSchema = Joi.object({
  name: Joi
    .string()
    .required(),
  permissions: Joi
    .array()
    .items(Joi.string().valid(...PERMISSIONS))
    .required(),
});

const GroupUpdateSchema = Joi.object({
  id: Joi
    .number()
    .required(),
  name: Joi
    .string()
    .required(),
  permissions: Joi
    .array()
    .items(Joi.string().valid(...PERMISSIONS))
    .required(),
});

const UserGroupCreateSchema = Joi.array().items(
  Joi.number().required(),
);

module.exports = {
  GroupCreateSchema,
  GroupUpdateSchema,
  UserGroupCreateSchema,
};