import { Router } from "express";

// importing controllers
import {
  forgetPassword,
  login,
  resetPassword,
  signup,
  verifyOtp,
} from "./auth.controllers.js";

// importing validations
import { validate } from "../../middlewares/validation.js";
import {
  loginValidationSchema,
  resetPasswordValidationSchema,
  signupValidationSchema,
} from "../../utils/validations/auth.validations.js";

// importing auth middlewares
import { isModelExists } from "../../middlewares/model.middlewares.js";

// importing models
import User from "../../../db/models/userModel.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  isModelExists(User, "email"),
  validate(signupValidationSchema),
  signup
);
authRouter.post("/login", validate(loginValidationSchema), login);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/verify-code", verifyOtp);
authRouter.post(
  "/reset-password",
  validate(resetPasswordValidationSchema),
  resetPassword
);

export default authRouter;
