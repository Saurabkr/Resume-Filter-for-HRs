const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadMiddleware");
const { uploadResumes } = require("../controllers/resumeController");
const { uploadLimiter } = require("../middlewares/rateLimiter");

router.post(
  "/upload",
  uploadLimiter,
  upload.array("resumes", 20),
  uploadResumes
);

module.exports = router;
