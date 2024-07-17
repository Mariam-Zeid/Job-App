import { Router } from "express";

// importing controllers
import {
  deleteAccount,
  getAccountData,
  getAllEmailsByRecoveryEmail,
  getAnotherUser,
  updateAccount,
  updatePassword,
} from "./user.controllers.js";

// importing validations
import { validate } from "../../middlewares/validation.js";
import {
  changePasswordValidationSchema,
  recoveryEmailValidationSchema,
  updateAccountValidationSchema,
} from "../../utils/validations/user.validations.js";

// importing auth middlewares
import {
  isAuthenticated,
  isAuthorized,
} from "../../middlewares/auth.middlewares.js";

const userRouter = Router();

// Only authorized user can access this route
userRouter
  .route("/")
  .all(isAuthenticated)
  .all(isAuthorized("User"))
  .get(getAccountData)
  .patch(validate(updateAccountValidationSchema), updateAccount)
  .delete(deleteAccount);

// Special route to change password
userRouter.patch(
  "/change-password",
  isAuthenticated,
  isAuthorized("User"),
  validate(changePasswordValidationSchema),
  updatePassword
);

// Special route to get all emails by recovery email
userRouter.get(
  "/all-emails",
  validate(recoveryEmailValidationSchema),
  getAllEmailsByRecoveryEmail
);

// Any user can access this routes
userRouter.get("/get-another-user", getAnotherUser);

export default userRouter;
