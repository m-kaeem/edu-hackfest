import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const nav = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    district: "",
    preferredLang: "bn",
  });

  const districts = [
    "Dhaka", "Gazipur", "Chittagong", "Rajshahi", "Khulna", 
    "Sylhet", "Rangpur", "Mymensingh", "Barisal", "Comilla"
  ];

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await register(form);
      nav("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
              🌾
            </div>
            <span className="font-bold text-2xl text-white">HarvestGuard</span>
          </div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            আজই শুরু করুন
          </h1>
          <p className="text-green-100 text-lg mb-8">
            বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আপনার ফসল রক্ষা করুন।
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
              <span>আবহাওয়া সতর্কতা পান</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
              <span>বাজার মূল্য ট্র্যাক করুন</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
              <span>AI দিয়ে ফসল স্ক্যান করুন</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <p className="text-white italic">"HarvestGuard ব্যবহার করে আমার ক্ষতি ৪০% কমেছে!"</p>
          <p className="text-green-100 text-sm mt-2">— রহিম মিয়া, গাজীপুর</p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
              🌾
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              HarvestGuard
            </span>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">অ্যাকাউন্ট তৈরি করুন 🌱</h2>
            <p className="text-gray-500 mb-6">বিনামূল্যে শুরু করুন</p>
              {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
              >
                <span>⚠️</span> {error}
              </motion.div>
            )}

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`;
              }}
              className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google দিয়ে সাইন আপ করুন
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">অথবা ইমেইল দিয়ে</span>
              </div>
            </div>
            
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="আপনার নাম"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">জেলা</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  required
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ভাষা</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, preferredLang: "bn" })}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      form.preferredLang === "bn"
                        ? "bg-green-100 text-green-700 border-2 border-green-500"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, preferredLang: "en" })}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      form.preferredLang === "en"
                        ? "bg-green-100 text-green-700 border-2 border-green-500"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    অপেক্ষা করুন...
                  </>
                ) : (
                  <>🎯 সাইন আপ করুন</>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-500">ইতিমধ্যে অ্যাকাউন্ট আছে? </span>
              <button
                onClick={() => nav("/login")}
                className="text-green-600 hover:text-green-700 font-semibold hover:underline"
              >
                লগইন করুন
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => nav("/")}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-2 mx-auto"
            >
              ← হোমে ফিরে যান
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
