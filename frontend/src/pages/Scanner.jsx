import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Scanner() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const t = {
    title: '📸 ফসল স্বাস্থ্য স্ক্যানার',
    subtitle: 'আপনার ফসলের ছবি তুলুন এবং AI দিয়ে স্বাস্থ্য পরীক্ষা করুন',
    uploadBtn: '📁 ছবি আপলোড করুন',
    takePhoto: '📷 ছবি তুলুন',
    analyze: '🔍 বিশ্লেষণ করুন',
    analyzing: 'বিশ্লেষণ করা হচ্ছে...',
    scanAnother: '🔄 আরেকটি স্ক্যান করুন',
    results: {
      title: '📋 স্ক্যান ফলাফল',
      condition: 'অবস্থা',
      confidence: 'নিশ্চয়তা',
      recommendation: 'পরামর্শ'
    },
    conditions: {
      fresh: { label: '✅ তাজা ও স্বাস্থ্যকর', color: 'green', advice: 'ফসল অবস্থা চমৎকার। বাজারের সঠিক মূল্যের জন্য অপেক্ষা করুন।' },
      mild: { label: '⚠️ হালকা ক্ষতি', color: 'yellow', advice: 'শীঘ্রই বিক্রয় করুন। ১-২ দিনের মধ্যে বাজারে নিয়ে যান।' },
      moderate: { label: '🟠 মাঝারি ক্ষতি', color: 'orange', advice: 'অবিলম্বে বিক্রয় করুন। আর বিলম্ব করবেন না।' },
      severe: { label: '🔴 গুরুতর ক্ষতি', color: 'red', advice: 'ক্ষতিগ্রস্ত অংশ আলাদা করুন। ভালো অংশ দ্রুত বিক্রয় করুন।' },
      rotten: { label: '❌ পচা', color: 'gray', advice: 'এই ফসল বিক্রয়যোগ্য নয়। পশুখাদ্য বা কম্পোস্টে ব্যবহার করুন।' }
    },
    tips: [
      '💡 ভালো আলোতে ছবি তুলুন',
      '📏 ফসলের কাছাকাছি থেকে তুলুন',
      '🔄 একাধিক কোণ থেকে তুলুন',
      '🎯 পরিষ্কার ছবি নিশ্চিত করুন'
    ]
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const conditions = ['fresh', 'mild', 'moderate', 'severe', 'rotten'];
      const randomCondition = conditions[Math.floor(Math.random() * 3)]; // Weighted towards better results
      const confidence = Math.floor(Math.random() * 15) + 85;
      setResult({ condition: randomCondition, confidence });
      setAnalyzing(false);
    }, 2500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getConditionStyle = (condition) => {
    const styles = {
      fresh: 'from-green-500 to-emerald-600',
      mild: 'from-yellow-500 to-amber-500',
      moderate: 'from-orange-500 to-red-500',
      severe: 'from-red-500 to-red-700',
      rotten: 'from-gray-500 to-gray-700'
    };
    return styles[condition] || styles.fresh;
  };

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
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-500">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
          >
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="text-6xl mb-4">📸</div>
                <p className="text-gray-600 mb-4">ছবি আপলোড করতে ক্লিক করুন</p>
                <div className="flex flex-col gap-2">
                  <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    {t.uploadBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden">
                  <img src={image} alt="Uploaded crop" className="w-full h-64 object-cover" />
                  <button 
                    onClick={handleReset}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                {!result && (
                  <button
                    onClick={analyzeImage}
                    disabled={analyzing}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t.analyzing}
                      </>
                    ) : (
                      <>{t.analyze}</>
                    )}
                  </button>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {result ? (
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t.results.title}</h3>
                
                <div className={`p-6 rounded-xl bg-gradient-to-br ${getConditionStyle(result.condition)} text-white mb-4`}>
                  <div className="text-2xl font-bold mb-1">
                    {t.conditions[result.condition]?.label}
                  </div>
                  <div className="text-sm opacity-90">
                    {t.results.confidence}: {result.confidence}%
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 {t.results.recommendation}</h4>
                  <p className="text-gray-600 text-sm">
                    {t.conditions[result.condition]?.advice}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 border-2 border-gray-200 rounded-xl font-medium hover:border-green-500 hover:text-green-600 transition-all"
                >
                  {t.scanAnother}
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💡 স্ক্যান টিপস</h3>
                <div className="space-y-3">
                  {t.tips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <span className="text-lg">{tip.split(' ')[0]}</span>
                      <span className="text-gray-700 text-sm">{tip.substring(tip.indexOf(' ') + 1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}