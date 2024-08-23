const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel'); // Adjust path as necessary

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if user data exists in the database (optional)
    // If no user data is found, allow request to proceed if token is valid
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(200).json({
        message: "Token is valid but user data not found.",
        success: true,
        user: null,
      });
    }

    req.userData = user; // Optionally attach user data to the request
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token.",
      success: false,
    });
  }
};

module.exports = isLoggedIn;
