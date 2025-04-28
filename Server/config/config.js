const mongoose = require("mongoose");
require("dotenv").config(); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected successfully");
}).catch((error) => {
  console.log("Database connection error:", error);
});