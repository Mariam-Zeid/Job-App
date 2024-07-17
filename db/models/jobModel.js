import { Schema, model, Types } from "mongoose";

const jobSchema = new Schema({
  jobTitle: { type: String, required: true },
  jobLocation: {
    type: String,
    enum: ["onsite", "remotely", "hybrid"],
    required: true,
  },
  workingTime: {
    type: String,
    enum: ["part-time", "full-time"],
    required: true,
  },
  seniorityLevel: {
    type: String,
    enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
    required: true,
  },
  jobDescription: { type: String, required: true },
  technicalSkills: { type: [String], required: true },
  softSkills: { type: [String], required: true },
  addedBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyId: {
    type: Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

// Middleware to delete associated applications when a job is deleted
jobSchema.pre("findOneAndDelete", async function (next) {
  const jobId = this.getQuery()["_id"];
  await Application.deleteMany({ jobId });
  next();
});

const Job = model("Job", jobSchema);
export default Job;
