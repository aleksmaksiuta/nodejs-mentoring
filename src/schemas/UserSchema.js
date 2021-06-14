const Joi = require('joi');

const PASSWORD_PATTERN = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){3,30}$');

const UserCreateSchema = Joi.object({
  login: Joi
    .string()
    .min(3)
    .max(30)
    .required(),
  password: Joi
    .string()
    .pattern(PASSWORD_PATTERN)
    .required(),
  age: Joi.number()
    .min(4)
    .max(130)
    .required(),
  isDeleted: Joi
    .bool()
    .default(false),
});

const UserUpdateSchema = Joi.object({
  id: Joi
    .number()
    .required(),
  login: Joi
    .string()
    .min(3)
    .max(30)
    .required(),
  password: Joi
    .string()
    .pattern(PASSWORD_PATTERN)
    .required(),
  age: Joi.number()
    .min(4)
    .max(130)
    .required(),
  isDeleted: Joi
    .bool()
    .default(false),
});

module.exports = {
  UserCreateSchema,
  UserUpdateSchema,
};