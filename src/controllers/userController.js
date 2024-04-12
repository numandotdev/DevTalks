import User from "../models/User.js";
import { decryptPassword, encryptPassword } from "../services/hashPassword.js";
import { generateJwtToken } from "../services/jwtToken.js";

export const getAllusers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    return res.status(201).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  } else {
    //check for existing user with the same name or email
    const found_user = await User.findOne({ email }); //({$or:[{name}, {email}]})

    if (found_user) {
      return res
        .status(409)
        .json({ message: "Conflict! User already exists." });
    }
    const newUser = new User({
      name,
      email,
      password: encryptPassword(password),
      blogs: [],
    });
    try {
      const savedUser = await newUser.save();
      const authToken = generateJwtToken(savedUser.email);
      res.cookie("auth-token", authToken);
      res.status(201).json({
        message: "User created successfully!",
        data: savedUser,
      });
    } catch (err) {
      console.log("Error in saving user to database");
      return res.status(500).json({ message: err.message });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // const authToken = req.cookies["auth-token"];
  // console.log(authToken)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid Email Address" });
  } else {
    let isValidPassword = await decryptPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    let token = generateJwtToken(user.email);
    // res.cookie("auth-token", token);
    res.status(200).json({ message: "User Logged In Successfully!", user });
  }
};

