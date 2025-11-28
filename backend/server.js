const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const batchRoutes = require('./routes/batches');
const weatherRoutes = require('./routes/weather');
const marketRoutes = require('./routes/market');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/market', marketRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'HarvestGuard Backend is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});