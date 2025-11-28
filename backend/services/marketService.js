const db = require('../db/connect');

exports.getMarketRecommendation = async (cropType, district) => {
  try {
    const result = await db.query(
      `SELECT * FROM market_prices 
       WHERE district = $1 AND commodity = $2 
       ORDER BY date DESC LIMIT 7`,
      [district, cropType]
    );

    if (result.rows.length === 0) {
      return {
        available: false,
        message: 'বাজার তথ্য পাওয়া যায়নি।'
      };
    }

    const prices = result.rows;
    const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
    const currentPrice = prices[0].price;
    const change = ((currentPrice - avgPrice) / avgPrice) * 100;

    let recommendation = '';
    if (change > 5) {
      recommendation = 'দাম বাড়ছে। ৩-৫ দিন অপেক্ষা করুন।';
    } else if (change < -5) {
      recommendation = 'দাম কমছে। এখনই বিক্রয় করুন।';
    } else {
      recommendation = 'দাম স্থিতিশীল। যেকোনো সময় বিক্রয় করুন।';
    }

    return {
      available: true,
      currentPrice,
      avgPrice: Math.round(avgPrice),
      changePercent: Math.round(change),
      trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable',
      recommendation
    };
  } catch (error) {
    console.error('Market recommendation error:', error);
    throw error;
  }
};