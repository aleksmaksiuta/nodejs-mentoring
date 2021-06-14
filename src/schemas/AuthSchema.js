const Joi = require('joi');

const PASSWORD_PATTERN = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){3,30}$');

const AuthSchema = Joi.object({
  login: Joi
    .string()
    .min(3)
    .max(30)
    .required(),
  password: Joi
    .string()
    .pattern(PASSWORD_PATTERN)
    .required(),
});

module.exports = {
  AuthSchema,
};