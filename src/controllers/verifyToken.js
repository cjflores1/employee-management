const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const token = req.headers['authorization'];
    if ( !token ) {
        res
        .status(401)
        .send({
            auth: false,
            message: "No token provided"
        });
        return;
    }
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
    req.userId = decoded.name;
    next();
};

module.exports = verifyToken;
