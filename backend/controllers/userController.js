import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../Model/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

// ----REGISTER-----
export const register = catchAsyncErrors(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return res.status(400).json({
         success: false, 
         message: "Please fill full form!" });
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
     success: false,
     message: "Email already registered!" });
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  sendToken(user, 201, res, "User Registered Successfully!");
});

// ---------------- LOGIN ----------------
export const login = catchAsyncErrors(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please provide email, password and role!",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
     success: false,
     message: "Invalid Email or Password." });
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(400).json({
     success: false, 
    message: "Invalid Email or Password!" });
  }

  if (user.role !== role) {
    return res.status(404).json({
      success: false,
      message: `User with provided email and role '${role}' not found!`,
    });
  }

  sendToken(user, 200, res, "User Logged In Successfully!");
});

// ---------------- LOGOUT ----------------
export const logout = catchAsyncErrors(async (req, res) => {
  res.status(200).cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});


// ---------------- GET USER ----------------
export const getUser = catchAsyncErrors((req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});