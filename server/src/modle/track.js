const mongoose = require("mongoose");

const { Schema } = mongoose;

const trackSchema = new Schema({
  name: String,
  artist: String,
  spotifyUserId: String,
});

module.exports = mongoose.model("Track", trackSchema);
