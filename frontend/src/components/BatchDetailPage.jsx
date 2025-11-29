import React, { useEffect, useState } from "react";
import { getBatchDetail } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BatchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBatchDetail(id)
      .then((res) => setData(res.data))
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return null;

  const { batch, etcl, market } = data;

  const getRiskStyle = (level) => {
    const styles = {
      low: { bg: 'from-green-500 to-emerald-600', text: '✅ নিরাপদ' },
      medium: { bg: 'from-yellow-500 to-amber-500', text: '⚠️ সতর্ক' },
      high: { bg: 'from-red-500 to-red-600', text: '🔴 জরুরি' }
    };
    return styles[level] || styles.low;
  };

  const cropIcons = { rice: '🌾', potato: '🥔', tomato: '🍅', onion: '🧅' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              ← ড্যাশবোর্ড
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm">
                🌾
              </div>
              <span className="font-bold text-gray-900">HarvestGuard</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Batch Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl">
              {cropIcons[batch.crop_type] || '🌱'}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 capitalize mb-1">
                {batch.crop_type}
              </h1>
              <p className="text-gray-500">{batch.district}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl mb-1">⚖️</div>
              <div className="text-xl font-bold text-gray-900">{batch.weight} kg</div>
              <div className="text-sm text-gray-500">ওজন</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">{batch.storage_type === 'covered' ? '🏠' : '☀️'}</div>
              <div className="text-xl font-bold text-gray-900">{batch.storage_type === 'covered' ? 'ঢাকা' : 'খোলা'}</div>
              <div className="text-sm text-gray-500">সংরক্ষণ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-xl font-bold text-gray-900">{new Date(batch.created_at).toLocaleDateString('bn-BD')}</div>
              <div className="text-sm text-gray-500">তারিখ</div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ETCL Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl text-white shadow-xl bg-gradient-to-br ${getRiskStyle(etcl?.riskLevel).bg}`}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              ⏱️ ETCL (মেয়াদ) পূর্বাভাস
            </h3>
            
            <div className="text-center py-4">
              <div className="text-6xl font-bold mb-2">{etcl?.etclHours || 72}</div>
              <div className="text-lg opacity-90">ঘন্টা বাকি</div>
            </div>

            <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="opacity-90">ঝুঁকি স্তর:</span>
                <span className="font-bold">{getRiskStyle(etcl?.riskLevel).text}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-90">আর্দ্রতা:</span>
                <span className="font-bold">{etcl?.factors?.humidity || 65}%</span>
              </div>
            </div>

            <div className="p-3 bg-white/20 rounded-xl text-sm">
              💡 {etcl?.advice || 'শস্য নিরাপদ। বাজার দর ভালো হলে বিক্রয় করুন।'}
            </div>
          </motion.div>

          {/* Market Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              📊 বাজার মূল্য বিশ্লেষণ
            </h3>

            {market?.available ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-700">৳{market.currentPrice}</div>
                    <div className="text-sm text-green-600">বর্তমান মূল্য/kg</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-gray-700">৳{market.avgPrice}</div>
                    <div className="text-sm text-gray-500">গড় মূল্য/kg</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4">
                  <span className="text-gray-600">ট্রেন্ড:</span>
                  <span className={`font-bold ${
                    market.trend === 'up' ? 'text-green-600' : 
                    market.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {market.trend === 'up' ? '📈 বাড়ছে' : 
                     market.trend === 'down' ? '📉 কমছে' : '➡️ স্থিতিশীল'}
                    {market.changePercent && ` (${market.changePercent > 0 ? '+' : ''}${market.changePercent}%)`}
                  </span>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="font-semibold text-blue-800 mb-1">💡 পরামর্শ</div>
                  <p className="text-sm text-blue-700">{market.recommendation}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-gray-500">{market?.message || 'বাজার তথ্য পাওয়া যায়নি'}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex gap-4"
        >
          <button
            onClick={() => navigate('/scanner')}
            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            📸 ফসল স্ক্যান করুন
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-4 border-2 border-gray-200 rounded-xl font-semibold hover:border-green-500 hover:text-green-600 transition-all"
          >
            ← ড্যাশবোর্ডে ফিরুন
          </button>
        </motion.div>
      </main>
    </div>
  );
}
