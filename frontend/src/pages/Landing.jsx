import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HarvestGuard() {
  const [lang, setLang] = useState('bn');
  
  const content = {
    bn: {
      hero: {
        problem: 'প্রতি বছর লাখ লাখ টন খাদ্য নষ্ট হয়…',
        title: 'HarvestGuard আপনার শস্য রক্ষা করবে।',
        subtitle: 'আবহাওয়া ও বাজার-বুদ্ধি মিলিয়ে আপনার ধানকে পচা ও কম দামে বিক্রি হওয়া থেকে রক্ষা করে।',
        ctaPrimary: 'শুরু করুন',
        ctaSecondary: 'আরও জানুন'
      },
      flow: ['ডাটা', 'সতর্কতা', 'কর্ম', 'রক্ষিত শস্য'],
      howItWorks: {
        title: 'কীভাবে কাজ করে',
        steps: [
          { title: 'ডাটা সংগ্রহ', desc: 'আবহাওয়া ও বাজার তথ্য সংগ্রহ' },
          { title: 'বিশ্লেষণ', desc: 'AI দিয়ে ঝুঁকি নির্ণয়' },
          { title: 'সতর্কতা', desc: 'SMS ও নোটিফিকেশন' },
          { title: 'সঞ্চয়', desc: 'আপনার ফসল রক্ষা করুন' }
        ]
      },
      features: {
        title: 'বৈশিষ্ট্যসমূহ',
        items: [
          { icon: '🌦️', title: 'আবহাওয়া পূর্বাভাস', desc: 'স্থানীয় আবহাওয়া সতর্কতা বাংলায়' },
          { icon: '📊', title: 'বাজার মূল্য', desc: 'রিয়েল-টাইম বাজার দর ও ট্রেন্ড' },
          { icon: '⏱️', title: 'ETCL পূর্বাভাস', desc: 'ফসল নষ্ট হওয়ার সময় পূর্বাভাস' },
          { icon: '📸', title: 'AI স্ক্যানার', desc: 'ছবি দিয়ে ফসলের স্বাস্থ্য পরীক্ষা' }
        ]
      },
      stats: {
        title: 'প্রভাব',
        items: [
          { value: '40%', label: 'ক্ষতি হ্রাস' },
          { value: '25%', label: 'বেশি লাভ' },
          { value: '1000+', label: 'কৃষক' }
        ]
      }
    },
    en: {
      hero: {
        problem: 'Millions of tons of food are wasted every year…',
        title: 'HarvestGuard will protect your harvest.',
        subtitle: 'Combine weather & market intelligence to protect your crops from spoilage and low prices.',
        ctaPrimary: 'Get Started',
        ctaSecondary: 'Learn More'
      },
      flow: ['Data', 'Alert', 'Action', 'Saved Harvest'],
      howItWorks: {
        title: 'How It Works',
        steps: [
          { title: 'Collect Data', desc: 'Gather weather & market info' },
          { title: 'Analyze', desc: 'AI-powered risk detection' },
          { title: 'Alert', desc: 'SMS & notifications' },
          { title: 'Save', desc: 'Protect your harvest' }
        ]
      },
      features: {
        title: 'Features',
        items: [
          { icon: '🌦️', title: 'Weather Forecast', desc: 'Local weather alerts in Bangla' },
          { icon: '📊', title: 'Market Prices', desc: 'Real-time market rates & trends' },
          { icon: '⏱️', title: 'ETCL Forecast', desc: 'Predict spoilage timeline' },
          { icon: '📸', title: 'AI Scanner', desc: 'Check crop health with photos' }
        ]
      },
      stats: {
        title: 'Impact',
        items: [
          { value: '40%', label: 'Loss Reduction' },
          { value: '25%', label: 'More Profit' },
          { value: '1000+', label: 'Farmers' }
        ]
      }
    }
  };
  
  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="px-4 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            HG
          </div>
          <span className="font-bold text-xl text-gray-900">HarvestGuard</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-white rounded-lg shadow-sm p-1">
            <button 
              onClick={() => setLang('bn')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                lang === 'bn' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              বাংলা
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                lang === 'en' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
          </div>
          <button className="px-4 py-2 text-green-600 hover:text-green-700 font-medium">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-red-600 text-xl md:text-2xl font-medium"
        >
          {t.hero.problem}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight"
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Animated Flow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {t.flow.map((item, i) => (
            <React.Fragment key={i}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  delay: i * 0.15,
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="p-4 md:p-6 bg-white shadow-lg rounded-xl w-28 md:w-32 hover:shadow-xl transition-shadow"
              >
                <div className="text-sm md:text-base font-semibold text-gray-800">
                  {item}
                </div>
              </motion.div>
              {i < t.flow.length - 1 && (
                <div className="text-2xl text-green-600 font-bold">→</div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
            {t.hero.ctaPrimary}
          </button>
          <button className="px-8 py-4 border-2 border-gray-300 rounded-lg font-medium text-lg hover:border-green-600 hover:text-green-600 transition-colors">
            {t.hero.ctaSecondary}
          </button>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t.features.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Impact */}
      <section className="px-4 py-16 bg-green-600 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.stats.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.stats.items.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {lang === 'bn' ? 'আজই শুরু করুন' : 'Get Started Today'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {lang === 'bn' 
              ? 'আপনার ফসল রক্ষা করুন এবং বেশি লাভ করুন'
              : 'Protect your harvest and maximize your profits'}
          </p>
          <button className="px-10 py-4 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 transition-colors shadow-lg">
            {lang === 'bn' ? 'বিনামূল্যে সাইন আপ করুন' : 'Sign Up Free'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 HarvestGuard. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}