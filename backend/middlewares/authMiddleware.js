const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// Authentication middleware function
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']; // Get token from request headers

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // Respond with 401 if no token
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' }); // Respond with 401 if token is invalid
    }
    
    req.userId = decoded.id; // Store user ID from the decoded token in request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Export the authentication middleware
module.exports = authMiddleware;
