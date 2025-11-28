const axios = require('axios');

exports.fetchWeather = async (district) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${district},BD&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    // Process weather data
    const current = data.list[0];
    const forecast = data.list.slice(0, 5);

    // Generate Bangla advisory
    let advice = '';
    if (current.pop > 0.6) {
      advice = 'আজ বৃষ্টি হবে। ধান ঢেকে রাখুন।';
    } else if (current.main.humidity > 80) {
      advice = 'আর্দ্রতা বেশি। শস্য দ্রুত শুকিয়ে নিন।';
    } else {
      advice = 'আবহাওয়া ভালো। শস্য নিরাপদ।';
    }

    return {
      temperature: Math.round(current.main.temp),
      humidity: current.main.humidity,
      rainProbability: Math.round(current.pop * 100),
      description: current.weather[0].description,
      advice,
      forecast: forecast.map(f => ({
        date: f.dt_txt,
        temp: Math.round(f.main.temp),
        rain: Math.round(f.pop * 100)
      }))
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};