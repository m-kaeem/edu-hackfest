import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function FarmerDashboard() {
  const [lang, setLang] = useState('bn');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const content = {
    bn: {
      dashboard: 'ড্যাশবোর্ড',
      welcome: 'স্বাগতম',
      addBatch: 'নতুন ব্যাচ',
      profile: 'প্রোফাইল',
      logout: 'লগআউট',
      stats: {
        activeBatches: 'সক্রিয় ব্যাচ',
        highRisk: 'উচ্চ ঝুঁকি',
        marketUp: 'বাজার বৃদ্ধি',
        totalValue: 'মোট মূল্য'
      },
      batches: 'আমার ব্যাচসমূহ',
      noBatches: 'কোন ব্যাচ নেই',
      viewDetails: 'বিস্তারিত দেখুন',
      riskLevels: {
        low: 'নিরাপদ',
        medium: 'সতর্ক',
        high: 'জরুরি'
      },
      weather: {
        title: 'আবহাওয়া সতর্কতা',
        rain: 'বৃষ্টির সম্ভাবনা',
        temp: 'তাপমাত্রা',
        humidity: 'আর্দ্রতা'
      },
      market: {
        title: 'বাজার মূল্য',
        trend: 'প্রবণতা',
        recommendation: 'পরামর্শ',
        waitDays: 'দিন অপেক্ষা করুন',
        sellNow: 'এখনই বিক্রি করুন'
      },
      batchDetail: {
        title: 'ব্যাচ বিস্তারিত',
        crop: 'ফসল',
        weight: 'ওজন',
        stored: 'সংরক্ষণ',
        etcl: 'মেয়াদ',
        days: 'দিন',
        scanCrop: 'ফসল স্ক্যান করুন',
        close: 'বন্ধ করুন'
      }
    },
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      addBatch: 'Add Batch',
      profile: 'Profile',
      logout: 'Logout',
      stats: {
        activeBatches: 'Active Batches',
        highRisk: 'High Risk',
        marketUp: 'Market Up',
        totalValue: 'Total Value'
      },
      batches: 'My Batches',
      noBatches: 'No batches yet',
      viewDetails: 'View Details',
      riskLevels: {
        low: 'Safe',
        medium: 'Caution',
        high: 'Urgent'
      },
      weather: {
        title: 'Weather Alert',
        rain: 'Rain Probability',
        temp: 'Temperature',
        humidity: 'Humidity'
      },
      market: {
        title: 'Market Price',
        trend: 'Trend',
        recommendation: 'Recommendation',
        waitDays: 'Wait days',
        sellNow: 'Sell Now'
      },
      batchDetail: {
        title: 'Batch Details',
        crop: 'Crop',
        weight: 'Weight',
        stored: 'Stored',
        etcl: 'Shelf Life',
        days: 'days',
        scanCrop: 'Scan Crop',
        close: 'Close'
      }
    }
  };

  const t = content[lang];

  // Number formatter for Bangla
  const formatNumber = (num) => {
    if (lang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num).replace(/\d/g, (digit) => bnDigits[digit]);
    }
    return num;
  };

  // Mock data
  const farmerName = 'রহিম মিয়া';
  
  const stats = {
    activeBatches: 5,
    highRisk: 1,
    marketUp: '+12%',
    totalValue: lang === 'bn' ? '৳ ১,৪৫,০০০' : '৳ 1,45,000'
  };

  const batches = [
    {
      id: 1,
      cropType: lang === 'bn' ? 'আমন ধান' : 'Aman Rice',
      weight: lang === 'bn' ? '৫০০' : '500',
      storedDate: lang === 'bn' ? '২০২৪-১১-১৫' : '2024-11-15',
      etclDays: lang === 'bn' ? '১২' : 12,
      riskLevel: 'high',
      marketTrend: 'up',
      marketRec: lang === 'bn' ? '৩ দিন অপেক্ষা করুন' : 'Wait 3 days',
      currentPrice: lang === 'bn' ? '৳ ৪৫/kg' : '৳ 45/kg'
    },
    {
      id: 2,
      cropType: lang === 'bn' ? 'আলু' : 'Potato',
      weight: lang === 'bn' ? '৮০০' : '800',
      storedDate: lang === 'bn' ? '২০২৪-১১-২০' : '2024-11-20',
      etclDays: lang === 'bn' ? '২৫' : 25,
      riskLevel: 'low',
      marketTrend: 'stable',
      marketRec: lang === 'bn' ? 'স্থিতিশীল - যেকোনো সময়' : 'Stable - anytime',
      currentPrice: lang === 'bn' ? '৳ ৩০/kg' : '৳ 30/kg'
    },
    {
      id: 3,
      cropType: lang === 'bn' ? 'টমেটো' : 'Tomato',
      weight: lang === 'bn' ? '২০০' : '200',
      storedDate: lang === 'bn' ? '২০২৪-১১-২৫' : '2024-11-25',
      etclDays: lang === 'bn' ? '৮' : 8,
      riskLevel: 'medium',
      marketTrend: 'down',
      marketRec: lang === 'bn' ? 'এখনই বিক্রি করুন' : 'Sell now',
      currentPrice: lang === 'bn' ? '৳ ৬০/kg' : '৳ 60/kg'
    }
  ];

  const weatherData = {
    temp: lang === 'bn' ? '২৮°C' : '28°C',
    humidity: lang === 'bn' ? '৭৮%' : '78%',
    rainProb: lang === 'bn' ? '৬৫%' : '65%',
    warning: lang === 'bn' 
      ? 'আগামী ২৪ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা। শস্য সুরক্ষিত রাখুন।'
      : 'Heavy rain expected in next 24 hours. Keep crops protected.'
  };

  const marketChartData = lang === 'bn' ? [
    { day: 'সোম', price: 42 },
    { day: 'মঙ্গল', price: 43 },
    { day: 'বুধ', price: 44 },
    { day: 'বৃহঃ', price: 45 },
    { day: 'শুক্র', price: 45 }
  ] : [
    { day: 'Mon', price: 42 },
    { day: 'Tue', price: 43 },
    { day: 'Wed', price: 44 },
    { day: 'Thu', price: 45 },
    { day: 'Fri', price: 45 }
  ];

  const getRiskColor = (level) => {
    switch(level) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRiskBadge = (level) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              HG
            </div>
            <span className="font-bold text-lg text-gray-900">HarvestGuard</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              {lang === 'bn' ? 'EN' : 'বাংলা'}
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {t.welcome}, {farmerName}
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-1">{formatNumber(stats.activeBatches)}</div>
            <div className="text-sm text-gray-600">{t.stats.activeBatches}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-red-600 mb-1">{formatNumber(stats.highRisk)}</div>
            <div className="text-sm text-gray-600">{t.stats.highRisk}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-1">{lang === 'bn' ? '+১২%' : stats.marketUp}</div>
            <div className="text-sm text-gray-600">{t.stats.marketUp}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalValue}</div>
            <div className="text-sm text-gray-600">{t.stats.totalValue}</div>
          </div>
        </div>

        {/* Weather Alert */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🌧️</div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-1">{t.weather.title}</h3>
              <p className="text-sm text-blue-800 mb-2">{weatherData.warning}</p>
              <div className="flex gap-4 text-xs text-blue-700">
                <span>{t.weather.rain}: {weatherData.rainProb}</span>
                <span>{t.weather.temp}: {weatherData.temp}</span>
                <span>{t.weather.humidity}: {weatherData.humidity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Batches Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t.batches}</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2">
            <span>+</span>
            <span>{t.addBatch}</span>
          </button>
        </div>

        {/* Batch Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {batches.map(batch => (
            <div 
              key={batch.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Risk Badge */}
              <div className={`h-2 ${getRiskBadge(batch.riskLevel)}`}></div>
              
              <div className="p-4">
                {/* Crop Type & Risk */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{batch.cropType}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(batch.riskLevel)}`}>
                    {t.riskLevels[batch.riskLevel]}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>{t.batchDetail.weight}:</span>
                    <span className="font-medium text-gray-900">{batch.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.batchDetail.etcl}:</span>
                    <span className="font-medium text-gray-900">{batch.etclDays} {t.batchDetail.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.market.title}:</span>
                    <span className="font-medium text-gray-900">{batch.currentPrice}</span>
                  </div>
                </div>

                {/* Market Recommendation */}
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {batch.marketTrend === 'up' ? '📈' : batch.marketTrend === 'down' ? '📉' : '➡️'}
                    </span>
                    <span className="text-xs font-medium text-blue-900">{t.market.recommendation}</span>
                  </div>
                  <p className="text-sm text-blue-800">{batch.marketRec}</p>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => setSelectedBatch(batch)}
                  className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch Detail Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{t.batchDetail.title}</h2>
              <button 
                onClick={() => setSelectedBatch(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Batch Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-2xl text-gray-900 mb-4">{selectedBatch.cropType}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">{t.batchDetail.weight}:</span>
                    <div className="font-bold text-lg text-gray-900">{selectedBatch.weight} kg</div>
                  </div>
                  <div>
                    <span className="text-gray-600">{t.batchDetail.stored}:</span>
                    <div className="font-bold text-lg text-gray-900">{selectedBatch.storedDate}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">{t.batchDetail.etcl}:</span>
                    <div className="font-bold text-lg text-gray-900">{selectedBatch.etclDays} {t.batchDetail.days}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">{t.market.trend}:</span>
                    <div className="font-bold text-lg text-gray-900">
                      {selectedBatch.marketTrend === 'up' ? '📈 বৃদ্ধি' : selectedBatch.marketTrend === 'down' ? '📉 হ্রাস' : '➡️ স্থিতিশীল'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">{t.weather.title}</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="text-sm text-gray-600">{t.weather.temp}</div>
                    <div className="font-bold text-gray-900">{weatherData.temp}</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">💧</div>
                    <div className="text-sm text-gray-600">{t.weather.humidity}</div>
                    <div className="font-bold text-gray-900">{weatherData.humidity}</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">🌧️</div>
                    <div className="text-sm text-gray-600">{t.weather.rain}</div>
                    <div className="font-bold text-gray-900">{weatherData.rainProb}</div>
                  </div>
                </div>
              </div>

              {/* Market Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">{t.market.title}</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={marketChartData}>
                    <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="price" stroke="#16A34A" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="text-center mt-3">
                  <span className="text-sm text-gray-600">{t.market.recommendation}: </span>
                  <span className="font-bold text-green-600">{selectedBatch.marketRec}</span>
                </div>
              </div>

              {/* AI Scanner */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">📸</div>
                <h4 className="font-bold text-gray-900 mb-2">{t.batchDetail.scanCrop}</h4>
                <p className="text-sm text-gray-600 mb-4">
                  {lang === 'bn' ? 'ফসলের ছবি তুলে স্বাস্থ্য পরীক্ষা করুন' : 'Take a photo to check crop health'}
                </p>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                  {lang === 'bn' ? 'ক্যামেরা খুলুন' : 'Open Camera'}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <button 
                onClick={() => setSelectedBatch(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                {t.batchDetail.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}