const { pipeline } = require("@xenova/transformers");

// cache the model instance
let embedder;

async function generateEmbedding(text) {
  try {
    if (!embedder) {
      // Load the model on first use
      embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );
    }

    const output = await embedder(text, {
      pooling: "mean", // reduce token vectors to a single vector
      normalize: true, // normalize the vector
    });

    return Array.from(output.data); // convert tensor to plain JS array
  } catch (err) {
    console.error("Error generating embedding:", err);
    throw err;
  }
}

module.exports = { generateEmbedding };
