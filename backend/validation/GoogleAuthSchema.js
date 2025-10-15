import Joi from 'joi';

/**
 * Validation schema for Google OAuth login request
 * Expects either 'credential' or 'idToken' field containing the Google ID token
 */
export const GoogleAuthSchema = Joi.object({
  credential: Joi.string().optional(),
  idToken: Joi.string().optional()
}).or('credential', 'idToken')
  .messages({
    'object.missing': 'Either credential or idToken must be provided'
  });
