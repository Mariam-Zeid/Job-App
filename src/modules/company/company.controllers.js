import Company from "../../../db/models/companyModel.js";
import { AppError, catchAsyncError } from "../../utils/appError.js";

export const addCompany = catchAsyncError(async (req, res) => {
  req.body.companyHR = req.user.id;
  const company = await Company.create(req.body);
  res.status(200).json({
    status: "success",
    company,
  });
});
export const updateCompany = catchAsyncError(async (req, res) => {
  const company = await Company.findByIdAndUpdate(
    req.params.companyId,
    req.body,
    { new: true }
  );
  return res.status(200).json({ message: "Company updated successfully" });
});
export const deleteCompany = catchAsyncError(async (req, res) => {
  const company = await Company.findOneAndDelete({ _id: req.params.companyId });
  if (!company) throw new AppError("Company not found", 404);
  return res.status(200).json({ message: "Company deleted successfully" });
});

export const getCompanyData = catchAsyncError(async (req, res) => {
  const company = await Company.findById(req.params.companyId);
  if (!company) throw new AppError("Company not found", 404);
  return res.status(200).json({ message: "done", company });
});

export const searchForCompany = catchAsyncError(async (req, res) => {
  const { company } = req.query;
  const companies = await Company.find({
    companyName: { $regex: company, $options: "i" },
  }).select("companyName -_id");
  res.status(200).json({ status: "success", companies });
});
