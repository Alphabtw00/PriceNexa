const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'no token provided' });
  }

  // 2nd index as token will be brearer: 
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    // to send req forward the filter chain
    next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid or expired token' });
  }
};

module.exports = authMiddleware;