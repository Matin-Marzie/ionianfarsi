import Joi from 'joi';

export const LoginSchema = Joi.object({
    username: Joi.string()
      .pattern(/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/)
      .trim()
      .lowercase()
      .required(),
  
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/)
      .required(),
  });
  