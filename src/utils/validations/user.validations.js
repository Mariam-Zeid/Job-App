import Joi from "joi";

export const updateAccountValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).messages({
    "string.min": "First name must be at least 3 characters long",
    "string.max": "First name cannot be longer than 20 characters",
  }),
  lastName: Joi.string().min(3).max(20).messages({
    "string.min": "Last name must be at least 3 characters long",
    "string.max": "Last name cannot be longer than 20 characters",
  }),
  email: Joi.string().email().messages({
    "string.email": "Please enter a valid email address",
  }),
  recoveryEmail: Joi.string().email().messages({
    "string.email": "Please enter a valid email address",
  }),
  mobileNumber: Joi.string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015",
    }),
  DOB: Joi.date().max(Date.now()).messages({
    "date.max": "Date of birth must be in the past",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown":
      "You can only update email, recoveryEmail, mobileNumber, lastName, and DOB",
  });

export const changePasswordValidationSchema = Joi.object({
  currentPassword: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one letter and one digit",
      "string.empty": "Current password cannot be empty",
    })
    .required()
    .messages({
      "any.required": "You must enter your current password",
    }),
  newPassword: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one letter and one digit",
      "string.empty": "New password cannot be empty",
    })
    .required()
    .messages({
      "any.required": "New password is required",
    }),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Confirm password must match the new password",
      "string.empty": "You must confirm your new password",
    }),
}).required();

export const recoveryEmailValidationSchema = Joi.object({
  recoveryEmail: Joi.string()
    .email()
    .messages({
      "string.empty": "Recovery Email cannot be empty",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    })
    .required(),
}).required();
