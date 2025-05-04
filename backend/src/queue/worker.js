const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { parseResume } = require("../services/parsingService");
const { generateEmbedding } = require("../services/embeddingService");
// const { saveResumeToDB } = require("../services/dbService");
const { storeEmbeddingInQdrant } = require("../services/qdrantService");

const worker = new Worker(
  "resume-processing",
  async (job) => {
    const { filePath, originalName } = job.data;
    console.log("Processing file:", filePath, originalName);
    try {
      const parsedText = await parseResume(filePath);
      // console.log("Parsed text:", parsedText);
      const embedding = await generateEmbedding(parsedText);
      // console.log("Generated embedding:", embedding);

      // Save to Qdrant
      await storeEmbeddingInQdrant(originalName, embedding, {
        filePath,
        originalName,
        parsedText,
        status: "processed",
      });

      // await saveResumeToDB({
      //   filePath,
      //   originalName,
      //   parsedText,
      //   embedding,
      //   status: "processed",
      // });
    } catch (error) {
      console.error("Failed to process:", filePath, error);
      // await saveResumeToDB({
      //   filePath,
      //   originalName,
      //   status: "failed",
      //   errorMessage: error.message,
      // });
    }
  },
  { connection }
);

module.exports = worker;
