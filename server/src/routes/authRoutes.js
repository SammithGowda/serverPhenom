const express = require("express");
const {
  loginRedirect,
  spotifyCallback,
  getMe,
} = require("../controller/authController");
const { fetchTopTracks } = require("../controller/trackController");

const router = express.Router();

router.get("/login", loginRedirect);
router.get("/callback", spotifyCallback);
router.get("/top-tracks", fetchTopTracks);

module.exports = router;
