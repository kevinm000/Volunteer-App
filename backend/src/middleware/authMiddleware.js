const jwt = require('jsonwebtoken');
const UserCredentials = require('../models/UserCredentials'); // Adjust path if necessary

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await UserCredentials.findById(decoded.id); // Fetch user from database

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token is invalid' });
    }
    console.error('Error in authenticateToken middleware:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authenticateToken;
