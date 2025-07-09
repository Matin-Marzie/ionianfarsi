import users from '../models/users.json' assert {type: "json"}
import jwt from 'jsonwebtoken';

const usersDB = {
    users: users,
    setUsers(newUsers) {
        this.users = newUsers;
    }
}

const handlerefreshToken = (req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(`This is cookies.jwt ${cookies.jwt}`);
    const refreshToken = cookies.jwt;

    // check user exists
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) { return res.status(403)}; //Forbidden
    
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            console.log(" ")
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            );
            res.json({accessToken})
        }
    );

}

export default { handlerefreshToken }