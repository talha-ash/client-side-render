const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware that runs BEFORE static file serving
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // You can add logic here:
    // - Authentication checks
    // - Logging
    // - Request modification
    // - etc.

    next(); // Important: Call next() to continue to static file serving
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
    // maxAge: '1y', // Cache for one year
    maxAge: '1m', // Cache for one minute
    etag: true, // Keep ETag generation enabled
    lastModified: true // Keep Last-Modified header enabled
}));

app.get('/{*splat}', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Fallback route if no static file is found
app.use((req, res) => {
    res.status(404).send('File not found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});