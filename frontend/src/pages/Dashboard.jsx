import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from "../hooks/useAuth";
import BatchForm from "../components/BatchForm";
import BatchList from "../components/BatchList";

export default function Dashboard() {
  const [lang, setLang] = useState('bn');
  const [showBatchForm, setShowBatchForm] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const t = {
    bn: {
      dashboard: 'ড্যাশবোর্ড',
      welcome: 'স্বাগতম',
      addBatch: '+ নতুন ব্যাচ',
      logout: 'লগআউট',
      stats: {
        activeBatches: 'সক্রিয় ব্যাচ',
        highRisk: 'উচ্চ ঝুঁকি',
        marketUp: 'বাজার বৃদ্ধি',
        totalValue: 'মোট মূল্য'
      },
      weather: {
        title: '🌦️ আবহাওয়া সতর্কতা',
        rain: 'বৃষ্টির সম্ভাবনা',
        temp: 'তাপমাত্রা',
        humidity: 'আর্দ্রতা',
        advice: 'আজ বৃষ্টি হবে না। শস্য নিরাপদ।'
      },
      market: {
        title: '📊 বাজার মূল্য',
        rice: 'চাল',
        trend: 'ট্রেন্ড',
        advice: '৩ দিন অপেক্ষা করুন - দাম বাড়ছে!'
      },
      scanner: '📸 ফসল স্ক্যান করুন',
      batches: '📦 আমার ব্যাচসমূহ'
    },
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      addBatch: '+ New Batch',
      logout: 'Logout',
      stats: {
        activeBatches: 'Active Batches',
        highRisk: 'High Risk',
        marketUp: 'Market Up',
        totalValue: 'Total Value'
      },
      weather: {
        title: '🌦️ Weather Alert',
        rain: 'Rain Probability',
        temp: 'Temperature',
        humidity: 'Humidity',
        advice: 'No rain today. Crops are safe.'
      },
      market: {
        title: '📊 Market Price',
        rice: 'Rice',
        trend: 'Trend',
        advice: 'Wait 3 days - prices are rising!'
      },
      scanner: '📸 Scan Crop',
      batches: '📦 My Batches'
    }
  }[lang];

  const stats = [
    { label: t.stats.activeBatches, value: '5', icon: '📦', color: 'from-blue-500 to-cyan-500' },
    { label: t.stats.highRisk, value: '1', icon: '⚠️', color: 'from-red-500 to-orange-500' },
    { label: t.stats.marketUp, value: '+12%', icon: '📈', color: 'from-green-500 to-emerald-500' },
    { label: t.stats.totalValue, value: '৳1.45L', icon: '💰', color: 'from-purple-500 to-pink-500' },
  ];

  const marketData = [
    { day: 'সোম', price: 42 },
    { day: 'মঙ্গল', price: 43 },
    { day: 'বুধ', price: 44 },
    { day: 'বৃহ', price: 43 },
    { day: 'শুক্র', price: 45 },
    { day: 'শনি', price: 47 },
    { day: 'আজ', price: 48 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-green-500/30">
                🌾
              </div>
              <div>
                <span className="font-bold text-lg text-gray-900">HarvestGuard</span>
                <span className="hidden sm:inline text-gray-400 ml-2">| {t.dashboard}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="hidden sm:flex bg-gray-100 rounded-full p-1">
                <button 
                  onClick={() => setLang('bn')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    lang === 'bn' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  বাংলা
                </button>
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    lang === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t.welcome}, <span className="text-green-600">{user?.name || 'কৃষক'}</span>! 👋
          </h1>
          <p className="text-gray-500 mt-1">আপনার ফসলের অবস্থা দেখুন</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl text-white shadow-xl"
          >
            <h3 className="text-lg font-bold mb-4">{t.weather.title}</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">              <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-1">🌧️</div>
                <div className="text-2xl font-bold">20%</div>
                <div className="text-xs opacity-80">{t.weather.rain}</div>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-1">🌡️</div>
                <div className="text-2xl font-bold">28°</div>
                <div className="text-xs opacity-80">{t.weather.temp}</div>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-1">💧</div>
                <div className="text-2xl font-bold">65%</div>
                <div className="text-xs opacity-80">{t.weather.humidity}</div>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <p className="text-sm">✅ {t.weather.advice}</p>
            </div>
          </motion.div>

          {/* Market Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{t.market.title}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                📈 +12%
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#fff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
                    }}
                    formatter={(value) => [`৳${value}/kg`, t.market.rice]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-700">💡 {t.market.advice}</p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowBatchForm(!showBatchForm)}
            className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📦</span>
            {t.addBatch}
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/scanner')}
            className="p-6 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-lg hover:border-green-500 hover:text-green-600 transition-all flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📸</span>
            {t.scanner}
          </motion.button>
        </div>

        {/* Batch Form Modal */}
        {showBatchForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">নতুন ব্যাচ তৈরি করুন</h3>
                <button 
                  onClick={() => setShowBatchForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <BatchForm onCreated={() => setShowBatchForm(false)} />
            </div>
          </motion.div>
        )}

        {/* Batch List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t.batches}</h3>
          <BatchList />
        </motion.div>
      </main>
    </div>
  );
}
