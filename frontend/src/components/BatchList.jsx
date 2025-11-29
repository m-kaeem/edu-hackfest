import React, { useState, useEffect } from "react";
import { getBatches } from "../api";
import { Link } from "react-router-dom";

export default function BatchList() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await getBatches();
      setBatches(res.data.batches || []);
    } catch {
      setBatches([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const getRiskBadge = (riskLevel) => {
    const styles = {
      low: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      high: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = { low: '✅ নিরাপদ', medium: '⚠️ সতর্ক', high: '🔴 জরুরি' };
    return { style: styles[riskLevel] || styles.low, label: labels[riskLevel] || labels.low };
  };

  const getCropIcon = (cropType) => {
    const icons = { rice: '🌾', potato: '🥔', tomato: '🍅', onion: '🧅' };
    return icons[cropType] || '🌱';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (batches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">কোন ব্যাচ নেই</h3>
        <p className="text-gray-500">নতুন ব্যাচ তৈরি করতে উপরের বাটনে ক্লিক করুন</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {batches.map((batch) => {
        const risk = getRiskBadge(batch.risk_level || 'low');
        return (
          <div 
            key={batch.id} 
            className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {getCropIcon(batch.crop_type)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 capitalize">{batch.crop_type}</h4>
                  <p className="text-sm text-gray-500">{batch.district}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${risk.style}`}>
                {risk.label}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-1 text-gray-600">
                <span>⚖️</span>
                <span>{batch.weight} kg</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>{batch.storage_type === 'covered' ? '🏠' : '☀️'}</span>
                <span>{batch.storage_type === 'covered' ? 'ঢাকা' : 'খোলা'}</span>
              </div>
            </div>

            <Link
              to={`/batches/${batch.id}`}
              className="block w-full py-2 text-center bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors"
            >
              বিস্তারিত দেখুন →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
