const axios = require('axios');
const db = require('../db/connect');

exports.syncMarketPrices = async () => {
  console.log('🔄 Starting market price sync...');
  
  try {
    // Example: Fetch from DAM or data.gov.bd
    // Replace with actual Bangladesh market data source
    const url = 'https://data.gov.bd/api/market-prices'; // Replace with real URL
    
    // Mock data for demonstration
    const mockPrices = [
      { district: 'Gazipur', commodity: 'rice', price: 45, marketName: 'Gazipur Bazaar' },
      { district: 'Dhaka', commodity: 'rice', price: 47, marketName: 'Karwan Bazaar' },
      { district: 'Chittagong', commodity: 'rice', price: 44, marketName: 'Chawk Bazaar' },
      { district: 'Gazipur', commodity: 'potato', price: 30, marketName: 'Gazipur Bazaar' },
      { district: 'Dhaka', commodity: 'tomato', price: 60, marketName: 'Karwan Bazaar' }
    ];

    // Insert into database
    for (const price of mockPrices) {
      await db.query(
        `INSERT INTO market_prices (district, commodity, price, market_name, date)
         VALUES ($1, $2, $3, $4, CURRENT_DATE)
         ON CONFLICT DO NOTHING`,
        [price.district, price.commodity, price.price, price.marketName]
      );
    }

    console.log('✅ Market prices synced successfully');
  } catch (error) {
    console.error('❌ Market sync error:', error);
  }
};

// Run immediately if called directly
if (require.main === module) {
  exports.syncMarketPrices().then(() => process.exit(0));
}