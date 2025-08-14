require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001; // Hardcoded port

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
