const jwt = require("jsonwebtoken");

exports.generateToken = (found_user) => {
  return jwt.sign(
    {
      id: found_user._id,
      username: found_user.username,
      email: found_user.email,
    },
    process.env.JWT_SECRET
  );
};


