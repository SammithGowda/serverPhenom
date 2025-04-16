const mongoose = require("mongoose");

const { Schema } = mongoose;

const SpotifyTokenSchema = new Schema({
  spotifyUserId: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("SpotifyToken", SpotifyTokenSchema);
