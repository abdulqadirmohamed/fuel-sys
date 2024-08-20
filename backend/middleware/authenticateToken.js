const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided!' });

    jwt.verify(token, '3812932sjad34&*@', (err, user) => {
        if (err) return res.status(403).json({ error: 'Access Denied: Invalid Token!' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
