import { AppError, catchAsyncError } from "../utils/appError.js";

export const isModelExists = (model, field, reqField = "body") =>
  catchAsyncError(async (req, res, next) => {
    const value = req[reqField][field];
    const existingDoc = await model.findOne({ [field]: value });

    if (existingDoc) {
      throw new AppError(`${field} already exists`, 409);
    }

    next();
  });

export const isModelNotExists = (model, field, reqField = "body") =>
  catchAsyncError(async (req, res, next) => {
    const value = req[reqField][field];
    const existingDoc = await model.findOne({ [field]: value });
    if (!existingDoc) {
      throw new AppError(`${field} not found`, 404);
    }
    next();
  });
