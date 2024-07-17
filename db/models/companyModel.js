import { Schema, model, Types } from "mongoose";
import "./jobModel.js";
import Job from "./jobModel.js";
import Application from "./applicationModel.js";

const companySchema = new Schema(
  {
    companyName: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    address: { type: String, required: true },
    numberOfEmployees: {
      from: {
        type: Number,
      },
      to: {
        type: Number,
      },
    },
    companyEmail: { type: String, unique: true, required: true },
    companyHR: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to delete associated jobs (and applications) when a company is deleted
companySchema.pre("findOneAndDelete", async function (next) {
  const companyId = this.getQuery()["_id"];
  const jobs = await Job.find({ companyId });
  await Application.deleteMany({ jobId: { $in: jobs.map((job) => job._id) } });
  await Job.deleteMany({ companyId });
  next();
});

const Company = model("Company", companySchema);

export default Company;
