import { usernameExists } from '../models/usersModel.js';

/**
 * Generates a unique username based on Google user data
 * Priority:
 * 1. firstName + lastName (if available and not taken)
 * 2. email username part (before @)
 * 3. email username + random 2 digits
 * 
 * @param {Object} userData - User data from Google
 * @param {string} userData.firstName - User's first name
 * @param {string} userData.lastName - User's last name  
 * @param {string} userData.email - User's email
 * @returns {Promise<string>} - Unique username
 */
export const generateUniqueUsername = async (userData) => {
  const { firstName, lastName, email } = userData;
  
  // Helper function to sanitize username (remove spaces, special chars, make lowercase)
  const sanitize = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9_]/g, '')
      .substring(0, 255); // Match DB varchar(255) limit
  };
  
  // Strategy 1: Try firstName + lastName
  if (firstName && lastName) {
    const candidate = sanitize(`${firstName}${lastName}`);
    if (candidate && !(await usernameExists(candidate))) {
      return candidate;
    }
  }
  
  // Strategy 2: Try email username (before @)
  const emailUsername = email.split('@')[0];
  const sanitizedEmail = sanitize(emailUsername);
  
  if (sanitizedEmail && !(await usernameExists(sanitizedEmail))) {
    return sanitizedEmail;
  }
  
  // Strategy 3: Email username + random 2 digits
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loop
  
  while (attempts < maxAttempts) {
    const randomDigits = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    const candidate = sanitize(`${emailUsername}${randomDigits}`);
    
    if (!(await usernameExists(candidate))) {
      return candidate;
    }
    
    attempts++;
  }
  
  // Fallback: Use timestamp (should be extremely rare)
  const timestamp = Date.now().toString().slice(-6);
  return sanitize(`${emailUsername}${timestamp}`);
};
