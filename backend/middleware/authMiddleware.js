// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  authenticateToken: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, config.secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  }
};
