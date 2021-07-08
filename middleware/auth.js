const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'The user is not authorized' })
    }

    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'The user is not authorized' })
    }
}