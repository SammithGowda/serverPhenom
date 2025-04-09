const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Helmet for security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: '*', // or specify domains like ['http://localhost:3001']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express with Helmet, CORS, and HTTP server!');
});

// Create and start the HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
