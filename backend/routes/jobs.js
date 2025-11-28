const express = require('express');
const router = express.Router();
const { syncMarketPrices } = require('../jobs/marketScraper');

router.post('/sync-market', async (req, res) => {
  try {
    await syncMarketPrices();
    res.json({ message: 'Market prices synced successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Sync failed' });
  }
});

module.exports = router;