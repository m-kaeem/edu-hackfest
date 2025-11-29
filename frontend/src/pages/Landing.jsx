import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  const [lang, setLang] = useState('bn');
  const navigate = useNavigate();
  
  const content = {
    bn: {
      hero: {
        problem: '⚠️ প্রতি বছর লাখ লাখ টন খাদ্য নষ্ট হয়…',
        title: 'HarvestGuard আপনার শস্য রক্ষা করবে।',
        subtitle: 'আবহাওয়া ও বাজার-বুদ্ধি মিলিয়ে আপনার ধানকে পচা ও কম দামে বিক্রি হওয়া থেকে রক্ষা করে।',
        ctaPrimary: '🚀 শুরু করুন',
        ctaSecondary: 'আরও জানুন'
      },
      flow: [
        { icon: '📊', text: 'ডাটা' },
        { icon: '🔔', text: 'সতর্কতা' },
        { icon: '✅', text: 'কর্ম' },
        { icon: '🌾', text: 'রক্ষিত শস্য' }
      ],
      howItWorks: {
        title: '🔄 কীভাবে কাজ করে',
        steps: [
          { icon: '📡', title: 'ডাটা সংগ্রহ', desc: 'আবহাওয়া ও বাজার তথ্য সংগ্রহ' },
          { icon: '🤖', title: 'AI বিশ্লেষণ', desc: 'AI দিয়ে ঝুঁকি নির্ণয়' },
          { icon: '📱', title: 'সতর্কতা', desc: 'SMS ও নোটিফিকেশন' },
          { icon: '💰', title: 'সঞ্চয়', desc: 'আপনার ফসল রক্ষা করুন' }
        ]
      },
      features: {
        title: '✨ বৈশিষ্ট্যসমূহ',
        items: [
          { icon: '🌦️', title: 'আবহাওয়া পূর্বাভাস', desc: 'স্থানীয় আবহাওয়া সতর্কতা বাংলায়', color: 'from-blue-500 to-cyan-500' },
          { icon: '📊', title: 'বাজার মূল্য', desc: 'রিয়েল-টাইম বাজার দর ও ট্রেন্ড', color: 'from-green-500 to-emerald-500' },
          { icon: '⏱️', title: 'ETCL পূর্বাভাস', desc: 'ফসল নষ্ট হওয়ার সময় পূর্বাভাস', color: 'from-orange-500 to-amber-500' },
          { icon: '📸', title: 'AI স্ক্যানার', desc: 'ছবি দিয়ে ফসলের স্বাস্থ্য পরীক্ষা', color: 'from-purple-500 to-pink-500' }
        ]
      },
      stats: {
        title: '📈 প্রভাব',
        items: [
          { value: '40%', label: 'ক্ষতি হ্রাস', icon: '📉' },
          { value: '25%', label: 'বেশি লাভ', icon: '💵' },
          { value: '1000+', label: 'কৃষক', icon: '👨‍🌾' }
        ]
      },
      nav: { login: 'লগইন', signup: 'সাইন আপ' },
      cta: { title: 'আজই শুরু করুন', subtitle: 'আপনার ফসল রক্ষা করুন এবং বেশি লাভ করুন', button: '🎯 বিনামূল্যে সাইন আপ করুন' }
    },
    en: {
      hero: {
        problem: '⚠️ Millions of tons of food are wasted every year…',
        title: 'HarvestGuard will protect your harvest.',
        subtitle: 'Combine weather & market intelligence to protect your crops from spoilage and low prices.',
        ctaPrimary: '🚀 Get Started',
        ctaSecondary: 'Learn More'
      },
      flow: [
        { icon: '📊', text: 'Data' },
        { icon: '🔔', text: 'Alert' },
        { icon: '✅', text: 'Action' },
        { icon: '🌾', text: 'Saved Harvest' }
      ],
      howItWorks: {
        title: '🔄 How It Works',
        steps: [
          { icon: '📡', title: 'Collect Data', desc: 'Gather weather & market info' },
          { icon: '🤖', title: 'AI Analysis', desc: 'AI-powered risk detection' },
          { icon: '📱', title: 'Alert', desc: 'SMS & notifications' },
          { icon: '💰', title: 'Save', desc: 'Protect your harvest' }
        ]
      },
      features: {
        title: '✨ Features',
        items: [
          { icon: '🌦️', title: 'Weather Forecast', desc: 'Local weather alerts in Bangla', color: 'from-blue-500 to-cyan-500' },
          { icon: '📊', title: 'Market Prices', desc: 'Real-time market rates & trends', color: 'from-green-500 to-emerald-500' },
          { icon: '⏱️', title: 'ETCL Forecast', desc: 'Predict spoilage timeline', color: 'from-orange-500 to-amber-500' },
          { icon: '📸', title: 'AI Scanner', desc: 'Check crop health with photos', color: 'from-purple-500 to-pink-500' }
        ]
      },
      stats: {
        title: '📈 Impact',
        items: [
          { value: '40%', label: 'Loss Reduction', icon: '📉' },
          { value: '25%', label: 'More Profit', icon: '💵' },
          { value: '1000+', label: 'Farmers', icon: '👨‍🌾' }
        ]
      },
      nav: { login: 'Login', signup: 'Sign Up' },
      cta: { title: 'Get Started Today', subtitle: 'Protect your harvest and maximize your profits', button: '🎯 Sign Up Free' }
    }
  };
  
  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-green-500/30">
                🌾
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                HarvestGuard
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-full p-1">
                <button 
                  onClick={() => setLang('bn')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    lang === 'bn' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  বাংলা
                </button>
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    lang === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                {t.nav.login}
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.nav.signup}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 font-medium"
          >
            {t.hero.problem}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Flow Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {t.flow.map((item, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-4 sm:p-6 bg-white shadow-xl shadow-green-500/10 rounded-2xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 cursor-pointer border border-green-100"
                >
                  <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-gray-800">
                    {item.text}
                  </div>
                </motion.div>
                {i < t.flow.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-2xl sm:text-3xl text-green-500"
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
            >
              {t.hero.ctaPrimary}
            </button>
            <button className="px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-lg hover:border-green-500 hover:text-green-600 transition-all duration-300">
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t.howItWorks.title}
            </span>
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {i < t.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-transparent z-0" />
                )}
                
                <div className="relative z-10 text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 group-hover:shadow-xl group-hover:shadow-green-500/10 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t.features.title}
            </span>
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            {t.stats.title}
          </motion.h2>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {t.stats.items.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-5xl sm:text-6xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 sm:p-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-100 shadow-xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t.cta.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              {t.cta.subtitle}
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {t.cta.button}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                🌾
              </div>
              <span className="font-bold text-lg">HarvestGuard</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 HarvestGuard. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}