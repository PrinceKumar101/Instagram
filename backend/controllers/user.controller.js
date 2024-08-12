import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user";

export const register = async function (req, res, next) {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !email || !password || !name) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }
    const found_user = await user.findOne({ email: email });
    if (found_user) {
      return res.status(401).json({
        message: "Try different email",
        sucess: false,
      });
    }
    const hash_password = await bcrypt.hash(password, 10);
    await user.create({
      username,
      email,
      name,
      password: hash_password,
    });
    return res.status(201).json({
      message: "Account created successfully",
      sucess: true,
    });
  } catch (err) {
    res.send(err.message);
  }
};

export const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "somthing is missing! please check",
        sucess: false,
      });
    }
    const found_user = await user.findOne({ email: email });
    if (!found_user) {
      return res.status(401).json({
        message: "User not found",
        sucess: false,
      });
    }
    const compare_password = await bcrypt.compare(
      password,
      found_user.password
    );
    if (!compare_password) {
      return res.status(401).json({
        message: "Incorrect email or password",
        sucess: false,
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
    const user_without_password = await user
      .findOne({ _id: found_user._id })
      .select("-password");
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `welcome back ${found_user.username}`,
        sucess: true,
        found_user: user_without_password,
      });
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = async function (req, res, next) {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out sucessfully",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async function (req, res, next) {
  try {
    const userId = req.prams;
    const found_user = user.findOne({ _id: userId });
  } catch (error) {
    console.log(error);
  }
};
