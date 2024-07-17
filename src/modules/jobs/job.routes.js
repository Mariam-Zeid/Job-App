import { application, Router } from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../../middlewares/auth.middlewares.js";
import {
  addJob,
  applyForJob,
  deleteJob,
  getAllApplicationsByJob,
  getJobs,
  updateJob,
} from "./job.controllers.js";
import { isModelExists } from "../../middlewares/model.middlewares.js";
import { validate } from "../../middlewares/validation.js";
import {
  addJobValidationSchema,
  updateJobValidationSchema,
} from "../../utils/validations/job.validations.js";
import Job from "../../../db/models/jobModel.js";
import upload from "../../middlewares/multer.middleware.js";

const jobRouter = Router();

// this is for (get all jobs - get all jobs by company - filter jobs)
jobRouter.get("/", getJobs);

// User can use this route
jobRouter
  .route("/applications")
  .get(getAllApplicationsByJob)
  .post(
    isAuthenticated,
    isAuthorized("User"),
    upload.single("userResumeURL"),
    applyForJob
  );

// Only HR can use this route
jobRouter.post(
  "/",
  isAuthenticated,
  isAuthorized("Company_HR"),
  validate(addJobValidationSchema),
  isModelExists(Job, "jobTitle"),
  addJob
);

// Only HR can use this route
jobRouter
  .route("/:jobId")
  .all(isAuthenticated)
  .all(isAuthorized("Company_HR"))
  .patch(validate(updateJobValidationSchema), updateJob)
  .delete(deleteJob);

export default jobRouter;
