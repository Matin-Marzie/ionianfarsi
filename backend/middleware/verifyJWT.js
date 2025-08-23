import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401); 

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbiden
            req.user = { username: decoded.username };; // extract username and attach to request
            next();
        }
    );
}

export default verifyJWT;