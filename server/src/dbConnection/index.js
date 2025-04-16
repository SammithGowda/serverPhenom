const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectionuri = process.env.DBURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionuri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
