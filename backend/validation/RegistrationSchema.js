import Joi from 'joi';

export const RegistrationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z '-]{3,35}$/)
    .trim()
    .lowercase()
    .required(),

  username: Joi.string()
    .pattern(/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/)
    .trim()
    .lowercase()
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/)
    .required(),
});
