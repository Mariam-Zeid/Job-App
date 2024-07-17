import express from "express";
import "dotenv/config";

import "./db/dbConnection.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import userRouter from "./src/modules/user/user.routes.js";
import companyRouter from "./src/modules/company/company.routes.js";
import jobRouter from "./src/modules/jobs/job.routes.js";

const app = express();

// 1) MIDDLEWARES
app.use(express.json());
app.use(express.static("applications"));

// 2) ROUTES
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/companies", companyRouter);
app.use("/jobs", jobRouter);

// 3) GLOBAL ERROR HANDLER
app.use((error, req, res, next) => {
  const { statusCode, status, message } = error;
  res
    .status(statusCode || 500)
    .json({ status: status, message: message || "Internal Server Error" });
});

// 4) SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
