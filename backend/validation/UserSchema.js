// validation/userSchema.js
import Joi from "joi";

// Schema for updating user profile (all optional, except username is from JWT not body)
export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(35).trim().optional(),
  email: Joi.string().email().max(50).optional(),
  experience: Joi.number().integer().min(0).optional(),
  section_id: Joi.number().integer().min(1).optional(),
  unit_id: Joi.number().integer().min(1).optional(),
  repetition_id: Joi.number().integer().min(1).max(9).optional(),
  lesson_id: Joi.number().integer().min(1).optional(),
}).min(1); // at least one field required


export const changeUsernameSchema = Joi.object({
  new_username: Joi.string()
    .alphanum()
    .min(4)
    .max(23)
    .required(),
});


// Schema for changing password
export const changePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/)
    .required(),
});
