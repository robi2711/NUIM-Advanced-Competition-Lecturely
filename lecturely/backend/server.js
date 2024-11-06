// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow CORS for all origins (you can limit this in production)
app.use(express.json()); // Parse JSON requests

// Sample endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});