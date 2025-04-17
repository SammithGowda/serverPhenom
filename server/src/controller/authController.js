const axios = require("axios");
const { generateJWT, getUserInfoFromSpotify } = require("../utils");
const querystring = require("querystring");
const User = require("../modle/user");
const SpotifyToken = require("../modle/spotifyToken");
const { response } = require("express");

// Spotify config
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const scope = "user-read-private user-read-email user-top-read";


const loginRedirect = async (req, res) => {
  const queryParams = querystring.stringify({
    response_type: "code",
    client_id,
    scope,
    redirect_uri,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};

const spotifyCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) return res.status(400).send("Missing authorization code");

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data; // one token from spotify

    const user = await getUserInfoFromSpotify(access_token);

    //save user data to DB
    const existingUser = await User.findOne({ spotifyUserId: user.id });

    //if use not exist in db create one
    if (!existingUser) {
      await User.create({
        spotifyUserId: user.id,
        email: user.email,
        displayName: user.display_name,
      });
    }

    
    //update token
    await SpotifyToken.findOneAndUpdate(
      {
        spotifyUserId: user.id,
      },
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expires_in: Date.now() + expires_in * 1000,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const jwtToken = generateJWT(user.id);
    const frontendRedirectUri = "http://localhost:3001/dashboard";

    // return res.json({
    //   message: "Login successful",
    //   jwt: jwtToken, // one token from jwt
    //   spotifyUser: {
    //     id: user.id,
    //     email: user.email,
    //     display_name: user.display_name,
    //   },
    // });

    res.redirect(`${frontendRedirectUri}?token=${jwtToken}&name=${encodeURIComponent(user.display_name)}&id=${user.id}&email=${encodeURIComponent(user.email)}`);

  } catch (error) {
    console.error("Callback error:", error.response?.data || error.message);
    return res.status(500).send("OAuth callback failed");
  }
};

const getMe = async (req, res) => {
  const userId = req.user.sub;
  res.json({ message: `Hello from protected route, user ${userId}` });
};

module.exports = { loginRedirect, spotifyCallback, getMe };
