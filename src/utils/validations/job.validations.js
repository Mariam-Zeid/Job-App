import Joi from "joi";

export const addJobValidationSchema = Joi.object({
  jobTitle: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": `"jobTitle" should be a type of 'text'`,
    "string.empty": `"jobTitle" cannot be an empty field`,
    "string.min": `"jobTitle" should have a minimum length of {#limit}`,
    "string.max": `"jobTitle" should have a maximum length of {#limit}`,
    "any.required": `"jobTitle" is a required field`,
  }),
  jobLocation: Joi.string()
    .valid("onsite", "remotely", "hybrid")
    .required()
    .messages({
      "string.base": `"jobLocation" should be a type of 'text'`,
      "string.empty": `"jobLocation" cannot be an empty field`,
      "any.only": `"jobLocation" must be one of [onsite, remotely, hybrid]`,
      "any.required": `"jobLocation" is a required field`,
    }),
  workingTime: Joi.string()
    .valid("part-time", "full-time")
    .required()
    .messages({
      "string.base": `"workingTime" should be a type of 'text'`,
      "string.empty": `"workingTime" cannot be an empty field`,
      "any.only": `"workingTime" must be one of [part-time, full-time]`,
      "any.required": `"workingTime" is a required field`,
    }),
  seniorityLevel: Joi.string()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
    .required()
    .messages({
      "string.base": `"seniorityLevel" should be a type of 'text'`,
      "string.empty": `"seniorityLevel" cannot be an empty field`,
      "any.only": `"seniorityLevel" must be one of [Junior, Mid-Level, Senior, Team-Lead, CTO]`,
      "any.required": `"seniorityLevel" is a required field`,
    }),
  jobDescription: Joi.string().min(10).max(2000).trim().required().messages({
    "string.base": `"jobDescription" should be a type of 'text'`,
    "string.empty": `"jobDescription" cannot be an empty field`,
    "string.min": `"jobDescription" should have a minimum length of {#limit}`,
    "string.max": `"jobDescription" should have a maximum length of {#limit}`,
    "any.required": `"jobDescription" is a required field`,
  }),
  technicalSkills: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": `"technicalSkills" should be a type of 'text'`,
        "string.empty": `"technicalSkills" cannot be an empty field`,
        "any.required": `"technicalSkills" is a required field`,
      })
    )
    .required()
    .messages({
      "array.base": `"technicalSkills" should be a type of 'array'`,
      "any.required": `"technicalSkills" is a required field`,
    }),
  softSkills: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": `"softSkills" should be a type of 'text'`,
        "string.empty": `"softSkills" cannot be an empty field`,
        "any.required": `"softSkills" is a required field`,
      })
    )
    .required()
    .messages({
      "array.base": `"softSkills" should be a type of 'array'`,
      "any.required": `"softSkills" is a required field`,
    }),
  companyId: Joi.string().required().messages({
    "string.base": `"companyId" should be a type of 'text'`,
    "string.guid": `"companyId" must be a valid GUID`,
    "string.empty": `"companyId" cannot be an empty field`,
    "any.required": `"companyId" is a required field`,
  }),
}).required();

export const updateJobValidationSchema = Joi.object({
  jobTitle: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": `"jobTitle" should be a type of 'text'`,
    "string.empty": `"jobTitle" cannot be an empty field`,
    "string.min": `"jobTitle" should have a minimum length of {#limit}`,
    "string.max": `"jobTitle" should have a maximum length of {#limit}`,
    "any.required": `"jobTitle" is a required field`,
  }),
  jobLocation: Joi.string()
    .valid("onsite", "remotely", "hybrid")
    .required()
    .messages({
      "string.base": `"jobLocation" should be a type of 'text'`,
      "string.empty": `"jobLocation" cannot be an empty field`,
      "any.only": `"jobLocation" must be one of [onsite, remotely, hybrid]`,
      "any.required": `"jobLocation" is a required field`,
    }),
  workingTime: Joi.string()
    .valid("part-time", "full-time")
    .required()
    .messages({
      "string.base": `"workingTime" should be a type of 'text'`,
      "string.empty": `"workingTime" cannot be an empty field`,
      "any.only": `"workingTime" must be one of [part-time, full-time]`,
      "any.required": `"workingTime" is a required field`,
    }),
  seniorityLevel: Joi.string()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
    .required()
    .messages({
      "string.base": `"seniorityLevel" should be a type of 'text'`,
      "string.empty": `"seniorityLevel" cannot be an empty field`,
      "any.only": `"seniorityLevel" must be one of [Junior, Mid-Level, Senior, Team-Lead, CTO]`,
      "any.required": `"seniorityLevel" is a required field`,
    }),
  jobDescription: Joi.string().min(10).max(2000).trim().required().messages({
    "string.base": `"jobDescription" should be a type of 'text'`,
    "string.empty": `"jobDescription" cannot be an empty field`,
    "string.min": `"jobDescription" should have a minimum length of {#limit}`,
    "string.max": `"jobDescription" should have a maximum length of {#limit}`,
    "any.required": `"jobDescription" is a required field`,
  }),
  technicalSkills: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": `"technicalSkills" should be a type of 'text'`,
        "string.empty": `"technicalSkills" cannot be an empty field`,
        "any.required": `"technicalSkills" is a required field`,
      })
    )
    .required()
    .messages({
      "array.base": `"technicalSkills" should be a type of 'array'`,
      "any.required": `"technicalSkills" is a required field`,
    }),
  softSkills: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": `"softSkills" should be a type of 'text'`,
        "string.empty": `"softSkills" cannot be an empty field`,
        "any.required": `"softSkills" is a required field`,
      })
    )
    .required()
    .messages({
      "array.base": `"softSkills" should be a type of 'array'`,
      "any.required": `"softSkills" is a required field`,
    }),
  companyId: Joi.string().required().messages({
    "string.base": `"companyId" should be a type of 'text'`,
    "string.guid": `"companyId" must be a valid GUID`,
    "string.empty": `"companyId" cannot be an empty field`,
    "any.required": `"companyId" is a required field`,
  }),
}).required();
