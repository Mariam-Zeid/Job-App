import { Schema, model, Types } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: { type: Types.ObjectId, ref: "Job", required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    userTechSkills: { type: [String], required: true },
    userSoftSkills: { type: [String], required: true },
    userResumeURL: { type: String, required: true }, // URL of the PDF file
  },
  {
    timestamps: true,
  }
);

// Middleware to add http://localhost:3000/ to resume URL
applicationSchema.post("init", function (doc) {
  doc.userResumeURL =
    "http://localhost:3000/" + encodeURIComponent(doc.userResumeURL);
});

const Application = model("Application", applicationSchema);
export default Application;
