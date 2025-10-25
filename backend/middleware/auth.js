// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware for normal authentication
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded; // attach user info (like id, role, etc.)
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware for authority-only routes
const authorityOnly = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'authority') {
      return res.status(403).json({ message: 'Access denied. Authority only.' });
    }
    next();
  });
};

module.exports = { auth, authorityOnly };
