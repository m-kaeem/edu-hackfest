const { fetchWeather } = require('../services/weatherService');

exports.getWeather = async (req, res) => {
  try {
    const { district } = req.query;

    if (!district) {
      return res.status(400).json({ error: 'District is required' });
    }

    const weatherData = await fetchWeather(district);

    res.json(weatherData);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
};