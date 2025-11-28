const { fetchWeather } = require('./weatherService');

exports.calculateETCL = async (district, storageType) => {
  try {
    const weather = await fetchWeather(district);

    let etclHours = 72; // Base: 3 days
    let riskLevel = 'low';

    // Factor 1: Humidity
    if (weather.humidity > 85) {
      etclHours = 24;
      riskLevel = 'high';
    } else if (weather.humidity > 75) {
      etclHours = 48;
      riskLevel = 'medium';
    }

    // Factor 2: Temperature
    if (weather.temperature > 35) {
      etclHours -= 12;
      riskLevel = 'high';
    }

    // Factor 3: Rain
    if (weather.rainProbability > 60) {
      etclHours -= 12;
      if (riskLevel !== 'high') riskLevel = 'medium';
    }

    // Factor 4: Storage type
    if (storageType === 'open') {
      etclHours -= 24;
      riskLevel = 'high';
    } else if (storageType === 'covered') {
      etclHours += 12;
    }

    // Minimum 12 hours
    etclHours = Math.max(12, etclHours);

    // Generate advice
    let advice = '';
    if (riskLevel === 'high') {
      advice = 'জরুরীভাবে ধান ঢেকে রাখুন এবং দ্রুত বিক্রয় করুন।';
    } else if (riskLevel === 'medium') {
      advice = 'সতর্ক থাকুন। ২-৩ দিনের মধ্যে বিক্রয় করুন।';
    } else {
      advice = 'শস্য নিরাপদ। বাজার দর ভালো হলে বিক্রয় করুন।';
    }

    return {
      etclHours,
      etclDays: Math.round(etclHours / 24),
      riskLevel,
      advice,
      factors: {
        humidity: weather.humidity,
        temperature: weather.temperature,
        rain: weather.rainProbability,
        storage: storageType
      }
    };
  } catch (error) {
    console.error('ETCL calculation error:', error);
    throw error;
  }
};