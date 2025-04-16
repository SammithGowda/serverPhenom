const axios = require("axios");
const jwt = require("jsonwebtoken");

const getUserInfoFromSpotify = async (access_token) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Spotify user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const generateJWT = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


module.exports = { getUserInfoFromSpotify, generateJWT };
