const express = require("express");
// const { errorHandler } = require("./middlewares/errorMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const chatbotRoutes = require("./routes/chatbot");
const path = require("path");

const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// console.log("Uploads directory:", path.join(__dirname, "..", "uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resumes", resumeRoutes);
app.use("/api/chatbot", chatbotRoutes);

module.exports = app;
