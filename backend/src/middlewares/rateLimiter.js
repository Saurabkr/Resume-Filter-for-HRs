const rateLimit = require("express-rate-limit");

const uploadLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: "Too many uploads from this IP, please try again later.",
});

module.exports = { uploadLimiter };
