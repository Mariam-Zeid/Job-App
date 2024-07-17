import bcrypt from "bcrypt";
import User from "../../../db/models/userModel.js";
import { AppError, catchAsyncError } from "../../utils/appError.js";

export const getAccountData = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user.id);
  // const user = await User.findById(req.params.userId);
  res.status(200).json({ status: "success", acountData: user });
});
export const updateAccount = catchAsyncError(async (req, res) => {
  const isObjEmpty = (obj) => Object.keys(obj).length === 0;

  // Check if there is data in the request body
  if (isObjEmpty(req.body))
    return res.status(400).json({ message: "No data submitted" });

  await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true, // Ensure validation rules are applied
  });

  res.status(200).json({
    status: "success",
    message: "Account data updated successfully",
  });
});
export const updatePassword = catchAsyncError(async (req, res) => {
  const existingUser = await User.findById(req.user.id);
  const { currentPassword, newPassword } = req.body;

  // Compare the current password entered with the password in the database
  const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
  if (!isMatch) throw new AppError("Incorrect password", 400);

  // Update the user's password
  existingUser.password = await bcrypt.hash(newPassword, +process.env.SALTING);
  await existingUser.save();

  // Respond with a success message
  return res.status(200).json({ message: "Password Changed Successfully" });
});
export const deleteAccount = catchAsyncError(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({
    status: "success",
    message: "Account deleted successfully",
  });
});
export const getAnotherUser = catchAsyncError(async (req, res) => {
  const user = await User.findById(
    req.query.userId,
    "-password -__v -recoveryEmail"
  );
  if (!user) throw new AppError("There is no user with that ID", 404);
  res.status(200).json({ status: "success", user });
});
export const getAllEmailsByRecoveryEmail = catchAsyncError(async (req, res) => {
  const allEmails = await User.find({
    recoveryEmail: req.body.recoveryEmail,
  }).select("email -_id ");

  if (!allEmails.length)
    throw new AppError("There is no user with that recovery email", 404);

  res.status(200).json({ status: "success", emails: allEmails });
});
