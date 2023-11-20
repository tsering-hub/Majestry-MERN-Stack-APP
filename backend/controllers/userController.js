const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register New User
// @route /users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;

  // Validation
  if (!username || !name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // find if user already exists
  const userEmailExists = await User.findOne({
    email,
  });

  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    username,
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login User
// @route /users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      usertype: user.userType,
      token: generateToken(user._id),
    });
  } else if (user) {
    res.status(401);
    throw new Error("Incorrect Password");
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Add New Chef
// @route /users/addchefaccount
// @access Private Admin
const addChefAccount = asyncHandler(async (req, res) => {
  const { username, name, email, password, contactno, gender } = req.body;

  // Validation
  if (!username || !name || !email || !password || !contactno || !gender) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // find if user already exists
  const userEmailExists = await User.findOne({
    email,
  });

  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    username,
    name,
    email,
    password: hashPassword,
    contactno,
    gender,
    userType: "Chef",
  });

  if (user) {
    res.status(201).json({
      msg: "Chef Account Created Successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get Chef
// @route /users/getchefs
// @access Private
const getChefs = asyncHandler(async (req, res) => {
  const chefs = await User.find(
    {
      userType: "Chef",
    },
    { createdAt: 0, updatedAt: 0, userType: 0, password: 0, __v: 0, _id: 0 }
  );
  if (chefs) {
    res.status(200).json({
      chefs: chefs,
    });
  } else {
    res.status(400);
    throw new Error("Can not Find Chefs");
  }
});

// @desc Get Me
// @route /users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.adminInfo,
  });
});

// @desc Get Me
// @route /users/myselfcustomer
// @access Private Customer
const getMyselfCustomer = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    _id: req.userInfo._id,
  });
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(400);
    throw new Error("Can not Find your account");
  }
});

// @desc update profilepic
// @route /users/profilepicupdate
// @access Private Customer
const updateProfilePic = asyncHandler(async (req, res) => {
  if (req.file == undefined) {
    res.status(400);
    throw new Error("Invalid file formate");
  }

  const user = await User.updateOne(
    { _id: req.userInfo._id },
    {
      profilepic: req.file.filename,
    }
  );
  if (user) {
    res.status(201).json({
      success: true,
      msg: "updated",
    });
  } else {
    res.status(400);
    throw new Error("Failed to update");
  }
});

// @desc update profile
// @route /users/profileupdate
// @access Private Customer
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.updateOne(
    { _id: req.userInfo._id },
    {
      name: req.body.name,
      contactno: req.body.contactno,
      gender: req.body.gender,
      dob: req.body.dob,
    }
  );
  if (user) {
    res.status(201).json({
      success: true,
      msg: "updated",
    });
  } else {
    res.status(400);
    throw new Error("Failed to update");
  }
});

// @desc change password
// @route /users/changepassword
// @access Private Customer
const changePassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;

  // Validation
  if (!oldpassword || !newpassword) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const user = await User.findOne({ _id: req.userInfo._id });
  if (user) {
    bcryptjs.compare(oldpassword, user.password, (e, result) => {
      if (result == false) {
        res.json({
          success: false,
          msg: "Incorrect password",
        });
        return;
      }

      bcryptjs.hash(newpassword, 10, (e, hashed_pw) => {
        user.password = hashed_pw;
        user.save();
        res.status(201).json({
          success: true,
          msg: "Password Changed Successfully",
        });
      });
    });
  } else {
    res.status(400);
    throw new Error("Failed to update");
  }
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  addChefAccount,
  getChefs,
  getMyselfCustomer,
  updateProfile,
  updateProfilePic,
  changePassword,
};
