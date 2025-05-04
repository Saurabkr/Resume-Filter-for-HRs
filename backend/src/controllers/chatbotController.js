const { generateEmbedding } = require("../services/embeddingService"); // Xenova-based
const { searchInQdrant } = require("../services/qdrantService");

async function searchResumesByQuery(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const queryEmbedding = await generateEmbedding(query);
    const results = await searchInQdrant(queryEmbedding);

    res.json({ results });
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Failed to search resumes" });
  }
}

module.exports = { searchResumesByQuery };
