const express = require("express");
const router = express.Router();
const { searchResumesByQuery } = require("../controllers/chatbotController");

router.post("/search", searchResumesByQuery);

module.exports = router;
