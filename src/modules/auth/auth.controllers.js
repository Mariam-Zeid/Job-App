import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import User from "../../../db/models/userModel.js";
import { AppError, catchAsyncError } from "../../utils/appError.js";
import { sendEmail } from "../../utils/send-email.js";

export const signup = catchAsyncError(async (req, res) => {
  // Generate a salt and hash the password
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    +process.env.SALTING
  );

  // Create a new user in the database with the provided data and hashed password
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  // Generate a JWT token for the new user
  const token = jwt.sign(
    { id: newUser._id, role: newUser.role, status: newUser.status },
    process.env.SECRET_KEY
  );

  // Respond with a success message and the generated token
  res
    .status(201)
    .json({ status: "success", message: "User created successfully", token });
});

export const login = catchAsyncError(async (req, res) => {
  const existingUser = await User.findOne({
    $or: [
      { email: req.body.email },
      { recoveryEmail: req.body.recoveryEmail },
      { mobileNumber: req.body.mobileNumber },
    ],
  });

  if (!existingUser) throw new AppError("User not found", 404);

  // Compare the password entered with the hashed password in the database
  const isMatch = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );

  // Compare the password entered with the hashed password in the database
  if (!isMatch) throw new AppError("Incorrect password", 400);

  // update user status
  existingUser.status = "online";
  await existingUser.save();

  // Generate a JWT token for the new user
  const token = jwt.sign(
    {
      id: existingUser._id,
      role: existingUser.role,
      status: existingUser.status,
    },
    process.env.SECRET_KEY
  );

  // Respond with success message and token
  res
    .status(200)
    .json({ status: "success", message: "Logged in successfully", token });
});

export const forgetPassword = catchAsyncError(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  // generate uniqe OTP
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // send OTP to user's email
  await sendEmail(email, "Reset Password OTP", `Your OTP is <h1>${otp}</h1>`);

  // store OTP in database
  user.otpCode = otp;
  await user.save();

  res.status(200).json({ status: "success", message: "Check your email" });
});

export const verifyOtp = catchAsyncError(async (req, res) => {
  const { otpCode } = req.body;
  const user = await User.findOne({ otpCode });
  if (!user) throw new AppError("Invalid OTP", 400);
  res.status(200).json({ status: "success", message: "OTP verified" });
});

export const resetPassword = catchAsyncError(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  // Update the user's password
  const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALTING);
  user.password = hashedPassword;

  // save user password in database
  await user.save();

  // Respond with a success message
  return res.status(200).json({ message: "Password Changed Successfully" });
});
