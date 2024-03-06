const jwt = require('jsonwebtoken');
const User = require('../models/user_data_schema');

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      // Handle unauthorized error
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token',
      });
    }
  
    req.decoded = decoded;
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const username = req.decoded.username;
    
    const user = await User.findOne({ username });

    if (!user || user.user_type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Permission denied. Only admins can perform this action.',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { verifyToken, isAdmin };
