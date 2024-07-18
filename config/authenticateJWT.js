const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Token expired or invalid' });
    }
};

module.exports = authenticateJWT;