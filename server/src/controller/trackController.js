const axios = require("axios");
const SpotifyToken = require("../modle/spotifyToken");
// const { saveTracksToDB } = require("../utils/trackUtils");

const fetchTopTracks = async (req, res) => {
  try {
    const spotifyUserId = req.user.sub; // Assuming JWT contains Spotify user ID
    console.log(spotifyUserId,"spotifyUserId from the re.user.sub")

    // 1. Get the stored Spotify access token from DB
    const tokenDoc = await SpotifyToken.findOne({ spotifyUserId });
    console.log(tokenDoc,"tokenDoc from the database")

    if (!tokenDoc) {
      return res.status(401).json({ error: "Spotify token not found" });
    }
    
    const { accessToken } = tokenDoc;
    console.log(accessToken,"accessToken in fetch track")
    // 2. Use token to call Spotify top tracks API
    const topTracksRes = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(topTracksRes,"topTracksRes from spotify api")
    
    // 3. Format the minimal track info
    const minimalTracks = topTracksRes.data.items.map((track) => ({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      spotifyUserId,
      spotifyTrackId: track.id,
    }));

    // 4. Save to DB
    // await saveTracksToDB(minimalTracks);

    return res.json({ message: "Top tracks saved", tracks: minimalTracks });
  } catch (error) {
    console.error("Fetch top tracks error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch or save tracks" });
  }
};


module.exports = { fetchTopTracks };
