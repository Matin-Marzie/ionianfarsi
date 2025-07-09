import users from '../models/users.json' assert {type: "json"}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

// tmp
import fsPromises from 'fs/promises'
import path from 'path'

const usersDB = {
    users: users,
    setUsers(newUsers) {
        this.users = newUsers;
    }
}

const handleLogout = async (req, res) => {
    // On client, also delete accessToken

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); //No content to send back

    const refreshToken = cookies.jwt;

    // If refresh token in DB
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie(
            'jwt', {
            httpOnly: true,
            // secure:  true,
            maxAge: 14 * (1000 * 60 * 60 * 24)
        })

        return res.sendStatus(204);
    };

    // Delete the refreshToken in DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(process.cwd(), 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    res.sendStatus(204);

}

export default { handleLogout }
// On client, also delete accessToke