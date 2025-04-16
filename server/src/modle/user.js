const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyUserId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  displayName: String,
});

module.exports = mongoose.model("User", userSchema);
