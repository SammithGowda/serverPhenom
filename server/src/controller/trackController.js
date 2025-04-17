const axios = require("axios");
const SpotifyToken = require("../modle/spotifyToken");
const Track = require("../modle/track");

const fetchTopTracks = async (req, res) => {
  try {
    const spotifyUserId = req.user.sub; // Assuming JWT contains Spotify user ID

    // 1. Get the stored Spotify access token from DB
    const tokenDoc = await SpotifyToken.findOne({ spotifyUserId });

    if (!tokenDoc) {
      return res.status(401).json({ error: "Spotify token not found" });
    }

    const { accessToken } = tokenDoc;

    // 2. Use token to call Spotify top tracks API
    const topTracksRes = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const items = topTracksRes.data.items;

    if (!items || items.length === 0) {
      return res.json({ message: "No top tracks found in your playlist", tracks: [] });
    }

    // 3. Format the minimal track info
    const minimalTracks = items.map((track) => ({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      spotifyUserId,
      spotifyTrackId: track.id,
    }));

    // 4. Save to DB
    await saveTracksToDB(minimalTracks);

    return res.json({ message: "Top tracks saved", tracks: minimalTracks });
  } catch (error) {
    console.error("Fetch top tracks error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch or save tracks" });
  }
};

const saveTracksToDB = async (tracks) => {
  if (!tracks || tracks.length === 0) return;

  const spotifyUserId = tracks[0].spotifyUserId;

  // Clear previous tracks for user (optional)
  await Track.deleteMany({ spotifyUserId });
  
  const tracksWithAdvice = await Promise.all(
    tracks.map(async (track) => {
      try {
        const response = await axios.get("https://api.adviceslip.com/advice");
        const advice = response.data.slip.advice;
        return { ...track, advice };
      } catch (err) {
        console.error("Failed to fetch advice:", err.message);
        return { ...track, advice: "No advice available" };
      }
    })
  );

  await Track.insertMany(tracksWithAdvice);
};

module.exports = { fetchTopTracks };
