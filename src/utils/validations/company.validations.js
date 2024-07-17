import Joi from "joi";

export const addCompanyValidationSchema = Joi.object({
  companyName: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": `"companyName" should be a type of 'text'`,
    "string.empty": `"companyName" cannot be an empty field`,
    "string.min": `"companyName" should have a minimum length of {#limit}`,
    "string.max": `"companyName" should have a maximum length of {#limit}`,
    "any.required": `"companyName" is a required field`,
  }),
  description: Joi.string().min(10).max(1000).trim().required().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "string.min": `"description" should have a minimum length of {#limit}`,
    "string.max": `"description" should have a maximum length of {#limit}`,
    "any.required": `"description" is a required field`,
  }),
  industry: Joi.string().min(3).max(50).trim().required().messages({
    "string.base": `"industry" should be a type of 'text'`,
    "string.empty": `"industry" cannot be an empty field`,
    "string.min": `"industry" should have a minimum length of {#limit}`,
    "string.max": `"industry" should have a maximum length of {#limit}`,
    "any.required": `"industry" is a required field`,
  }),
  address: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": `"address" should be a type of 'text'`,
    "string.empty": `"address" cannot be an empty field`,
    "string.min": `"address" should have a minimum length of {#limit}`,
    "string.max": `"address" should have a maximum length of {#limit}`,
    "any.required": `"address" is a required field`,
  }),
  numberOfEmployees: Joi.object({
    from: Joi.number().positive().required().messages({
      "number.base": `"numberOfEmployees.from" should be a type of 'number'`,
      "number.empty": `"numberOfEmployees.from" cannot be an empty field`,
      "number.positive": `"numberOfEmployees.from" should be a positive number`,
      "any.required": `"numberOfEmployees.from" is a required field`,
    }),
    to: Joi.number().greater(Joi.ref("from")).required().messages({
      "number.base": `"numberOfEmployees.to" should be a type of 'number'`,
      "number.empty": `"numberOfEmployees.to" cannot be an empty field`,
      "number.greater": `"numberOfEmployees.to" should be greater than 'numberOfEmployees.from'`,
      "any.required": `"numberOfEmployees.to" is a required field`,
    }),
  })
    .required()
    .messages({
      "object.base": `"numberOfEmployees" should be a type of 'object'`,
      "object.empty": `"numberOfEmployees" cannot be an empty field`,
      "any.required": `"numberOfEmployees" is a required field`,
    }),
  companyEmail: Joi.string().email().required().messages({
    "string.base": `"companyEmail" should be a type of 'email'`,
    "string.empty": `"companyEmail" cannot be an empty field`,
    "string.email": `"companyEmail" should be a valid email`,
    "any.required": `"companyEmail" is a required field`,
  }),
}).required();
export const updateCompanyValidationSchema = Joi.object({
  companyName: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": `"companyName" should be a type of 'text'`,
    "string.empty": `"companyName" cannot be an empty field`,
    "string.min": `"companyName" should have a minimum length of {#limit}`,
    "string.max": `"companyName" should have a maximum length of {#limit}`,
    "any.required": `"companyName" is a required field`,
  }),
  description: Joi.string().min(10).max(1000).trim().required().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "string.min": `"description" should have a minimum length of {#limit}`,
    "string.max": `"description" should have a maximum length of {#limit}`,
    "any.required": `"description" is a required field`,
  }),
  industry: Joi.string().min(3).max(50).trim().required().messages({
    "string.base": `"industry" should be a type of 'text'`,
    "string.empty": `"industry" cannot be an empty field`,
    "string.min": `"industry" should have a minimum length of {#limit}`,
    "string.max": `"industry" should have a maximum length of {#limit}`,
    "any.required": `"industry" is a required field`,
  }),
  address: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": `"address" should be a type of 'text'`,
    "string.empty": `"address" cannot be an empty field`,
    "string.min": `"address" should have a minimum length of {#limit}`,
    "string.max": `"address" should have a maximum length of {#limit}`,
    "any.required": `"address" is a required field`,
  }),
  numberOfEmployees: Joi.object({
    from: Joi.number().positive().required().messages({
      "number.base": `"numberOfEmployees.from" should be a type of 'number'`,
      "number.empty": `"numberOfEmployees.from" cannot be an empty field`,
      "number.positive": `"numberOfEmployees.from" should be a positive number`,
      "any.required": `"numberOfEmployees.from" is a required field`,
    }),
    to: Joi.number().greater(Joi.ref("from")).required().messages({
      "number.base": `"numberOfEmployees.to" should be a type of 'number'`,
      "number.empty": `"numberOfEmployees.to" cannot be an empty field`,
      "number.greater": `"numberOfEmployees.to" should be greater than 'numberOfEmployees.from'`,
      "any.required": `"numberOfEmployees.to" is a required field`,
    }),
  })
    .required()
    .messages({
      "object.base": `"numberOfEmployees" should be a type of 'object'`,
      "object.empty": `"numberOfEmployees" cannot be an empty field`,
      "any.required": `"numberOfEmployees" is a required field`,
    }),
  companyEmail: Joi.string().email().required().messages({
    "string.base": `"companyEmail" should be a type of 'email'`,
    "string.empty": `"companyEmail" cannot be an empty field`,
    "string.email": `"companyEmail" should be a valid email`,
    "any.required": `"companyEmail" is a required field`,
  }),
}).required();
