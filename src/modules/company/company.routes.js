import { Router } from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../../middlewares/auth.middlewares.js";
import {
  addCompany,
  deleteCompany,
  getCompanyData,
  searchForCompany,
  updateCompany,
} from "./company.controllers.js";
import { validate } from "../../middlewares/validation.js";
import {
  addCompanyValidationSchema,
  updateCompanyValidationSchema,
} from "../../utils/validations/company.validations.js";
import Company from "../../../db/models/companyModel.js";
import {
  isModelExists,
  isModelNotExists,
} from "../../middlewares/model.middlewares.js";

const companyRouter = Router();

// HR and User can use this route
companyRouter.get("/", searchForCompany);

// Only HR can use this route
companyRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("Company_HR"),
  isModelExists(Company, "_id", "params"),
  validate(addCompanyValidationSchema),
  addCompany
);

// Only HR can use this route
companyRouter
  .route("/:companyId")
  .all(isAuthenticated)
  .all(isAuthorized("Company_HR"))
  .get(isModelNotExists(Company, "companyId"), getCompanyData)
  .patch(
    isModelNotExists(Company, "companyId"),
    validate(updateCompanyValidationSchema),
    updateCompany
  )
  .delete(isModelNotExists(Company, "companyId"), deleteCompany);

export default companyRouter;
