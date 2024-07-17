import Application from "../../../db/models/applicationModel.js";
import Company from "../../../db/models/companyModel.js";
import Job from "../../../db/models/jobModel.js";
import { AppError, catchAsyncError } from "../../utils/appError.js";

export const addJob = catchAsyncError(async (req, res) => {
  req.body.addedBy = req.user.id;

  const company = await Company.findById(req.body.companyId);
  if (!company) throw new AppError("Company not found", 404);

  const job = await Job.create(req.body);
  res.status(200).json({
    status: "success",
    job,
  });
});

export const updateJob = catchAsyncError(async (req, res) => {
  await Job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    message: "Job updated successfully",
  });
});

export const deleteJob = catchAsyncError(async (req, res) => {
  await Job.findByIdAndDelete(req.params.jobId);
  res.status(200).json({
    status: "success",
    message: "Job deleted successfully",
  });
});

export const getJobs = catchAsyncError(async (req, res) => {
  const {
    company,
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.query;

  // GET JOBS BY COMPANY NAME
  if (company) {
    const existingCompany = await Company.findOne({
      companyName: { $regex: company, $options: "i" },
    });
    if (!existingCompany) throw new AppError("No results found", 404);

    const jobs = await Job.find({ companyId: existingCompany._id }).select(
      "jobTitle jobLocation seniorityLevel workingTime -_id"
    );
    return res.status(200).json({ status: "success", jobs });
  }

  // GET JOBS BY FILTER
  if (
    workingTime ||
    jobLocation ||
    seniorityLevel ||
    jobTitle ||
    technicalSkills
  ) {
    // Construct filter object based on provided filters
    const filters = {};
    if (workingTime) filters.workingTime = workingTime;
    if (jobLocation) filters.jobLocation = jobLocation;
    if (seniorityLevel) filters.seniorityLevel = seniorityLevel;
    if (jobTitle) filters.jobTitle = { $regex: jobTitle, $options: "i" };
    if (technicalSkills)
      filters.technicalSkills = { $all: technicalSkills.split(",") }; // assuming technicalSkills is an array field

    // Find jobs based on filters
    const jobs = await Job.find(filters).select(
      "jobTitle jobLocation seniorityLevel workingTime -_id"
    );

    res.status(200).json({
      status: "success",
      jobs,
    });
  }

  // GET ALL JOBS
  const jobs = await Job.find()
    .populate({
      path: "companyId",
      model: "Company",
      select: "-_id -__v -numberOfEmployees",
    })
    .select("jobTitle jobLocation seniorityLevel workingTime -_id");

  const renamedJobs = jobs.map((job) => ({
    ...job._doc,
    company: job.companyId,
    companyId: undefined,
  }));

  res.status(200).json({
    status: "success",
    jobs: renamedJobs,
  });
});

export const applyForJob = catchAsyncError(async (req, res) => {
  // Check if the jobId exists
  const job = await Job.findById(req.body.jobId);
  if (!job) throw new AppError("Job not found", 404);

  // Check if the user has already applied for this job
  const existingApplication = await Application.findOne({
    $and: [{ jobId: req.body.jobId }, { userId: req.user.id }],
  });
  if (existingApplication)
    throw new AppError("You have already applied for this job", 400);

  // Convert userTechSkills and userSoftSkills back to arrays if needed
  const userTechSkills = req.body.userTechSkills;
  const userSoftSkills = req.body.userSoftSkills;

  // If the skills were sent as comma-separated strings, convert them to arrays
  const userTechSkillsArray =
    typeof userTechSkills === "string"
      ? userTechSkills.split(",")
      : userTechSkills;
  const userSoftSkillsArray =
    typeof userSoftSkills === "string"
      ? userSoftSkills.split(",")
      : userSoftSkills;

  // Create the application with all required fields
  await Application.create({
    jobId: req.body.jobId,
    userId: req.user.id,
    userTechSkills: userTechSkillsArray,
    userSoftSkills: userSoftSkillsArray,
    userResumeURL: req.file.filename, // Assuming multer stores file path in req.file.path
  });

  res.status(200).json({
    status: "success",
    message: "Your application has been submitted successfully",
  });
});

export const getAllApplicationsByJob = catchAsyncError(async (req, res) => {
  // Get all applications for a specific job by hob title
  const job = await Job.findOne({
    jobTitle: { $regex: req.query.jobTitle, $options: "i" },
  });
  if (!job) throw new AppError("Job not found", 404);

  // Get all applications for the job
  const applications = await Application.find({ jobId: job._id }).select(
    "userResumeURL -_id"
  );
  res.status(200).json({ status: "success", applications });
});
