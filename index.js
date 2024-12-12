const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable trust proxy to correctly handle HTTPS when behind a proxy (Cloudflare)
app.enable('trust proxy');

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    // Request was via https, so do not redirect
    next();
  } else {
    // Request was via http, so redirect to https
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public', {
    maxAge: '30d', // Cache static assets for 30 days
    etag: false    // Disable ETag for consistency
}));

// Set Cache-Control headers for the root route
app.get('/', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=2592000, immutable' // Cache root route
  });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
