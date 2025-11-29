import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login({ email, password: pass });
      nav("/dashboard");
    } catch {
      setErr("Invalid credentials");
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
            আপনার ফসল রক্ষা করুন
          </h1>
          <p className="text-green-100 text-lg">
            আবহাওয়া ও বাজার-বুদ্ধি মিলিয়ে আপনার ধানকে পচা ও কম দামে বিক্রি হওয়া থেকে রক্ষা করুন।
          </p>
        </div>
        
        <div className="relative z-10 flex gap-4">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-white">40%</div>
            <div className="text-green-100 text-sm">ক্ষতি হ্রাস</div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-white">1000+</div>
            <div className="text-green-100 text-sm">কৃষক</div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
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
            <h2 className="text-3xl font-bold mb-2 text-gray-900">স্বাগতম! 👋</h2>
            <p className="text-gray-500 mb-8">আপনার অ্যাকাউন্টে লগইন করুন</p>
            
            {err && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
              >
                <span>⚠️</span> {err}
              </motion.div>
            )}
            
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ইমেইল
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  <>🚀 লগইন করুন</>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-500">অ্যাকাউন্ট নেই? </span>
              <button
                onClick={() => nav("/register")}
                className="text-green-600 hover:text-green-700 font-semibold hover:underline"
              >
                সাইন আপ করুন
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
