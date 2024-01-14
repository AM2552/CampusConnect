const jwt = require('jsonwebtoken');

//change this to .env process var
const JWT_SECRET = 'jwt_secret_123';

function verifyToken(req, res, next) {
    const token = req.header('auth-token').split(' ')[1];
    if (!token) 
    return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;

        next();
        
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;