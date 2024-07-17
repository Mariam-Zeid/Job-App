import jwt from "jsonwebtoken";

// importing error handlers
import { AppError, catchAsyncError } from "../utils/appError.js";

// importing models
import User from "../../db/models/userModel.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;

  // Check if token exists
  if (!token) throw new AppError("Token not found", 404);

  // Check if token is valid
  if (!token.startsWith(process.env.BEARER_KEY))
    throw new AppError("Invalid token", 498);

  // Extract the actual token after the bearer key
  const baseToken = token.split(" ")[1];

  // Verify the token using the secret key
  const decodedUser = jwt.verify(baseToken, process.env.SECRET_KEY);

  // Check if the decoded token's payload contains a user ID
  if (!decodedUser.id) throw new AppError("Invalid token payload", 400);

  // Check if the user specified in the token exists
  const tokenUser = await User.findById(decodedUser.id);
  if (!tokenUser) throw new AppError("User not found", 404);

  // Set the user in the request object
  req.user = decodedUser;
  next();
});

export const isAuthorized = (role) =>
  catchAsyncError(async (req, res, next) => {
    const { user } = req;

    // Check if user role matches the required role
    if (user.role !== role) throw new AppError("No enough privileges", 403);

    // Check if user is currently offline
    if (user.status === "offline")
      throw new AppError("Please log in first", 401);

    next();
  });
