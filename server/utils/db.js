const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  if (!URI) {
    console.error("MONGODB_URI is missing. Copy server/.env.example to server/.env and fill it.");
    process.exit(1);
  }
  try {
    await mongoose.connect(URI, { serverSelectionTimeoutMS: 10000 });
    console.log("Database Connection Successful");
  } catch (error) {
    console.error("Database Connection failed:");
    console.error(error && error.message ? error.message : error);
    if (error && error.reason) console.error(error.reason);
    process.exit(1);
  }
};

module.exports = connectDb;
