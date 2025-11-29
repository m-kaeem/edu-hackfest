import React, { useState } from "react";
import { createBatch } from "../api";

export default function BatchForm({ onCreated }) {
  const [form, setForm] = useState({
    cropType: "rice",
    weight: "",
    storageType: "covered",
    district: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    { value: 'rice', label: '🌾 ধান', labelEn: 'Rice' },
    { value: 'potato', label: '🥔 আলু', labelEn: 'Potato' },
    { value: 'tomato', label: '🍅 টমেটো', labelEn: 'Tomato' },
    { value: 'onion', label: '🧅 পেঁয়াজ', labelEn: 'Onion' },
  ];

  const districts = [
    "Dhaka", "Gazipur", "Chittagong", "Rajshahi", "Khulna", 
    "Sylhet", "Rangpur", "Mymensingh", "Barisal", "Comilla"
  ];

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await createBatch(form);
      setMsg("✅ ব্যাচ সফলভাবে তৈরি হয়েছে!");
      onCreated && onCreated();
      setForm({ cropType: "rice", weight: "", storageType: "covered", district: "" });
    } catch {
      const pending = JSON.parse(localStorage.getItem("hg_pending_batches") || "[]");
      pending.push(form);
      localStorage.setItem("hg_pending_batches", JSON.stringify(pending));
      setMsg("📴 অফলাইনে সংরক্ষিত — স্বয়ংক্রিয়ভাবে সিঙ্ক হবে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {msg && (
        <div className={`p-4 rounded-xl text-sm ${
          msg.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
        }`}>
          {msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ফসলের ধরন</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {cropTypes.map(crop => (
            <button
              key={crop.value}
              type="button"
              onClick={() => setForm({ ...form, cropType: crop.value })}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                form.cropType === crop.value
                  ? 'bg-green-100 text-green-700 border-2 border-green-500'
                  : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              {crop.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ওজন (kg)</label>
        <input
          type="number"
          value={form.weight}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          placeholder="যেমন: 500"
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">সংরক্ষণ পদ্ধতি</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setForm({ ...form, storageType: 'covered' })}
            className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              form.storageType === 'covered'
                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            🏠 ঢাকা
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, storageType: 'open' })}
            className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              form.storageType === 'open'
                ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            ☀️ খোলা
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">জেলা</label>
        <select
          value={form.district}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
          onChange={(e) => setForm({ ...form, district: e.target.value })}
          required
        >
          <option value="">জেলা নির্বাচন করুন</option>
          {districts.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            সংরক্ষণ হচ্ছে...
          </>
        ) : (
          <>💾 ব্যাচ সংরক্ষণ করুন</>
        )}
      </button>
    </form>
  );
}
