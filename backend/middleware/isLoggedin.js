const jwt = require('jsonwebtoken');
const userModel = require("../models/user"); // Adjust path as necessary

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
      success: false,
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data to request object
    req.user = decoded;

    // Fetch user data from database
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(200).json({
        message: "Token is valid but user data not found.",
        success: true,
        user: null,
      });
    }

    req.userData = user; // Attach user data to request object
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Log error for debugging
    return res.status(403).json({
      message: "Invalid token.",
      success: false,
    });
  }
};

module.exports = isLoggedIn;
