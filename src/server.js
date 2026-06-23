require("dotenv").config();  // Load env vars first

const app = require("./app");
const connectToDB = require("./config/db");

// Connect to DB before starting server
connectToDB();

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
 