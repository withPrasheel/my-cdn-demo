const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Trust the first proxy (Cloudflare)
app.set('trust proxy', true);

// Serve static files from the 'public' directory with caching
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
