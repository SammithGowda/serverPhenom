const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const querystring = require('querystring');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Spotify constants
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const scope = 'user-read-private user-read-email';

// Step 1: Redirect to Spotify login
app.get('/login', (req, res) => {
  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Step 2: Spotify redirects back with code
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // You can store these tokens in DB or session
    res.json({
      access_token,
      refresh_token,
      expires_in,
    });
  } catch (error) {
    console.error('Token Exchange Error:', error.response?.data || error.message);
    res.status(500).send('Failed to get access token');
  }
});

// Optional: Use access token to get user profile
app.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send('Missing token');

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (err) {
    res.status(401).send('Invalid or expired token');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
