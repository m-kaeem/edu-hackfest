const db = require('../db/connect');

exports.getMarketPrices = async (req, res) => {
  try {
    const { district, commodity } = req.query;

    const result = await db.query(
      `SELECT * FROM market_prices 
       WHERE district = $1 AND commodity = $2 
       ORDER BY date DESC LIMIT 14`,
      [district, commodity]
    );

    if (result.rows.length === 0) {
      return res.json({
        prices: [],
        trend: 'stable',
        advice: 'বাজার তথ্য পাওয়া যায়নি।'
      });
    }

    const prices = result.rows;
    const trend = calculateTrend(prices);
    const advice = generateAdvice(trend);

    res.json({
      currentPrice: prices[0].price,
      prices,
      trend,
      advice
    });
  } catch (error) {
    console.error('Market prices error:', error);
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
};

function calculateTrend(prices) {
  if (prices.length < 2) return 'stable';

  const recent = prices.slice(0, 3).reduce((sum, p) => sum + p.price, 0) / 3;
  const older = prices.slice(3, 7).reduce((sum, p) => sum + p.price, 0) / 4;

  const change = ((recent - older) / older) * 100;

  if (change > 5) return 'up';
  if (change < -5) return 'down';
  return 'stable';
}

function generateAdvice(trend) {
  if (trend === 'up') {
    return '৩-৫ দিন অপেক্ষা করলে বেশি দাম পাবেন।';
  } else if (trend === 'down') {
    return 'এখনই বিক্রয় করুন। দাম কমছে।';
  }
  return 'বাজার স্থিতিশীল। যেকোনো সময় বিক্রয় করতে পারেন।';
}