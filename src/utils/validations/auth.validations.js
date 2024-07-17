import Joi from "joi";

export const signupValidationSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20)
    .messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 3 characters long",
      "string.max": "First name cannot be longer than 20 characters",
    })
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .messages({
      "string.empty": "Last name cannot be empty",
      "string.min": "Last name must be at least 3 characters long",
      "string.max": "Last name cannot be longer than 20 characters",
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    })
    .required(),
  recoveryEmail: Joi.string()
    .email()
    .messages({
      "string.empty": "Recovery email cannot be empty",
      "string.email": "Please enter a valid email address",
      "any.required": "Recovery email is required",
    })
    .required(),
  mobileNumber: Joi.string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015",
    })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one letter and one digit",
    })
    .required(),
  role: Joi.string().valid("User", "Company_HR"),
  DOB: Joi.date().max(Date.now()),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  recoveryEmail: Joi.string().email().messages({
    "string.empty": "Recovery email cannot be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Recovery email is required",
  }),
  mobileNumber: Joi.string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015",
    }),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one letter and one digit",
    })
    .required(),
}).xor("email", "recoveryEmail", "mobileNumber");

export const resetPasswordValidationSchema = Joi.object({
  email: Joi.string().email().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
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
}).required();
