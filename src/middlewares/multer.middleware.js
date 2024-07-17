import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "applications/"); // Upload files inside the 'applications' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuid();
    cb(null, uniqueSuffix + "-" + file.originalname); // Rename the uploaded file
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF files
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    // Reject other files
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
});

export default upload;
