// services/qdrantService.js
const { QdrantClient } = require("@qdrant/js-client-rest");
const { randomUUID } = require("crypto");

const client = new QdrantClient({ url: "http://localhost:6333" });
const COLLECTION_NAME = "resumes";

async function ensureCollectionExists() {
  const collections = await client.getCollections();
  if (!collections.collections.find((c) => c.name === COLLECTION_NAME)) {
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 384, // Match embedding size
        distance: "Cosine",
      },
    });
  }
}

async function storeEmbeddingInQdrant(name, vector, metadata) {
  await ensureCollectionExists();
  const payload = {
    id: randomUUID(),
    vector,
    payload: metadata,
  };

  await client.upsert(COLLECTION_NAME, {
    points: [payload],
  });

  console.log("Stored embedding in Qdrant:", name);
}

async function searchInQdrant(embedding, topK = 5) {
  const result = await client.search(COLLECTION_NAME, {
    vector: embedding,
    limit: topK,
    with_payload: true,
  });

  return result.map((item) => ({
    score: item.score,
    resume: item.payload,
  }));
}

module.exports = { storeEmbeddingInQdrant, searchInQdrant };
