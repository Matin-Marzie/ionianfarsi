import bcrypt from 'bcrypt';
import { createUser, findUserByUsername } from '../models/usersModel.js';
import { RegistrationSchema } from '../validation/RegistrationSchema.js';

const handleNewUser = async (req, res) => {
  const { error } = RegistrationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, username, password } = req.body;

  try {
    // Έλεγχος αν υπάρχει ήδη χρήστης
    const duplicate = await findUserByUsername(username);
    if (duplicate) return res.sendStatus(409); // Conflict

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Δημιουργία χρήστη
    const userId = await createUser(name, username, hashedPassword);

    res.status(201).json({ success: `New user ${username} created with id ${userId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewUser };
