import { AppError } from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMsg = error.details
      .map(({ message }) => message.replace(/['"]/g, "")) // Remove single and double quotes from messages
      .join(", "); // Concatenate messages with a comma and space

    throw new AppError(errorMsg, 400);
  }

  next();
};
