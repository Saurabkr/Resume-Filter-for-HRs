require("dotenv").config();
const app = require("./src/app.js");
// const connectDB = require("./src/config/db.js");

const PORT = process.env.PORT || 3000;

// connectDB().then(() => {
//   app.listen(PORT, () => console.log("Server running"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
