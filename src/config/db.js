const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((error) => {
      console.error("❌ Error connecting MongoDB:", error.message);
      process.exit(1);
    });
}

module.exports = connectToDB;
