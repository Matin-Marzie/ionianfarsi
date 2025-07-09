import bcrypt from 'bcrypt'
import users from '../models/users.json' assert {type: "json"}
import jwt from 'jsonwebtoken';



// temp
import fsPromises from 'fs/promises'
import path from 'path'


const usersDB = {
    users: users,
    setUsers(newUsers) {
        this.users = newUsers;
    }
}

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) { return res.status(400).json({ 'message': 'Username and password are required.' }) };
    // check user exists
    const foundUser = usersDB.users.find(person => person.username === username);
    if (!foundUser) { return res.status(401).json({ 'message': `Username ${username} not found.` }) } // Unauthorized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '14d' }
        );
        // Save refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(process.cwd(), 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure:  true,
            sameSite: 'None',
            maxAge: 14 * (1000 * 60 * 60 * 24)
        }) // 14 days
        res.json({ accessToken: accessToken })
    } else {
        res.status(401).json({ 'message': 'Incorect password.' });
    }

}

export default { handleLogin }