const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/Token");
const userModel = require("../models/user");
const cookie = require("cookie")
const register = async function (req, res, next) {
  try {
    const { username, name, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password || !name) {
      console.log("Missing fields in request body");
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Check if email already exists
    const found_user = await userModel.findOne({ email: email });
    if (found_user) {
      console.log(`Email already in use: ${email}`);
      return res.status(409).json({
        message: "Email already in use. Try a different email.",
        success: false,
      });
    }

    // Hash the password
    const hash_password = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await userModel.create({
      username,
      email,
      name,
      password: hash_password,
    });

    // Generate a token
    let token = generateToken(user);
    cookie.serialize("token", token, {
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Respond with success
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (err) {
    // Log the error for debugging
    console.error("Error in registration:", err.message);
    res.status(500).json({
      message: "Server error",
      success:false,
    });
  }
};

const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is missing",
        success: false,
      });
    }
    const found_user = await User.findOne({ email: email });
    if (!found_user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    const compare_password = await bcrypt.compare(
      password,
      found_user.password
    );
    if (!compare_password) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        userId: found_user._id,
        email: found_user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const user_without_password = await User.findById(found_user._id).select(
      "-password"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back, ${found_user.username}`,
        success: true,
        user: user_without_password,
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const logout = async function (req, res, next) {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const getProfile = async function (req, res, next) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing",
        success: false,
      });
    }
    const found_user = await User.findById(userId).select("-password");
    if (!found_user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user: found_user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
