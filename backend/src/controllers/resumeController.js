const { resumeQueue } = require("../queue/resumeQueue");

const uploadResumes = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    for (const file of files) {
      await resumeQueue.add("process_resume", {
        filePath: file.path,
        originalName: file.originalname,
      });
    }

    res
      .status(200)
      .json({ message: "Resumes uploaded and queued for processing." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading resumes." });
  }
};

module.exports = { uploadResumes };
