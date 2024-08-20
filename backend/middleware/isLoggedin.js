const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
      success: false,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token.",
        success: false,
      });
    }

    req.user = user;
    next();
  });
};

module.exports = isLoggedIn;
