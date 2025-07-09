import bcrypt from 'bcrypt';
import path from 'path';
import fsPromises from 'fs/promises'
import users from '../models/users.json' assert {type: 'json'};

const usersDB = {
    users: users,
    setUsers(newUsers) {
        this.users = newUsers;
    }
}


const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check if username already exits
    const duplicate = usersDB.users.find(person => person.username === username);
    if (duplicate) return res.sendStatus(409); // Conflict: User already exists
    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = { "username": username, 'password': hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(process.cwd(), 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${username} created.` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

export default { handleNewUser };