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
    console.log("Received login request", { email, password: !!password });

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({
        message: "Email or password is missing",
        success: false,
      });
    }

    // Find user by email
    console.log("Searching for user with email:", email);
    const foundUser = await userModel.findOne({ email: email });
    
    if (!foundUser) {
      console.log("User not found with email:", email);
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if password matches
    console.log("User found:", foundUser);
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    console.log("Password comparison result:", isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      console.log("Incorrect password for user:", email);
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: foundUser._id,
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("JWT token generated:", token);

    // Get user data without password
    const userWithoutPassword = await userModel.findById(foundUser._id).select("-password");
    console.log("User data retrieved without password:", userWithoutPassword);

    // Set cookie and send response
    console.log("Setting cookie and sending response");
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      })
      .json({
        message: `Welcome back, ${foundUser.username}`,
        success: true,
        user: userWithoutPassword,
      });

  } catch (err) {
    console.error("Error occurred during login:", err.message);
    return res.status(500).json({
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
