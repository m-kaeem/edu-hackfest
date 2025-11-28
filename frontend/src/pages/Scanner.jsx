import React, { useState, useRef } from 'react';

export default function CropScanner() {
  const [lang, setLang] = useState('bn');
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const content = {
    bn: {
      title: 'ফসল স্বাস্থ্য স্ক্যানার',
      subtitle: 'আপনার ফসলের ছবি তুলুন এবং AI দিয়ে স্বাস্থ্য পরীক্ষা করুন',
      uploadBtn: 'ছবি আপলোড করুন',
      takePhoto: 'ছবি তুলুন',
      analyzing: 'বিশ্লেষণ করা হচ্ছে...',
      scanAnother: 'আরেকটি স্ক্যান করুন',
      results: {
        title: 'স্ক্যান ফলাফল',
        condition: 'অবস্থা',
        confidence: 'নিশ্চয়তা',
        recommendation: 'পরামর্শ',
        details: 'বিস্তারিত তথ্য'
      },
      conditions: {
        fresh: 'তাজা ও স্বাস্থ্যকর',
        mild: 'হালকা ক্ষতি',
        moderate: 'মাঝারি ক্ষতি',
        severe: 'গুরুতর ক্ষতি',
        rotten: 'পচা'
      },
      recommendations: {
        fresh: 'ফসল অবস্থা চমৎকার। বাজারের সঠিক মূল্যের জন্য অপেক্ষা করুন।',
        mild: 'শীঘ্রই বিক্রয় করুন। ১-২ দিনের মধ্যে বাজারে নিয়ে যান।',
        moderate: 'অবিলম্বে বিক্রয় করুন। আর বিলম্ব করবেন না।',
        severe: 'ক্ষতিগ্রস্ত অংশ আলাদা করুন। ভালো অংশ দ্রুত বিক্রয় করুন।',
        rotten: 'এই ফসল বিক্রয়যোগ্য নয়। পশুখাদ্য বা কম্পোস্টে ব্যবহার করুন।'
      },
      details: {
        fresh: 'কোন পচন বা ক্ষতির চিহ্ন নেই। রঙ এবং গঠন স্বাভাবিক।',
        mild: 'সামান্য বিবর্ণতা দেখা যাচ্ছে। শীঘ্রই পচন শুরু হতে পারে।',
        moderate: 'স্পষ্ট পচনের লক্ষণ। ৩০-৪০% অংশ ক্ষতিগ্রস্ত।',
        severe: 'ব্যাপক পচন। ৬০-৭০% অংশ ক্ষতিগ্রস্ত।',
        rotten: 'সম্পূর্ণ পচে গেছে। মানব ভোগের জন্য অনুপযুক্ত।'
      },
      tips: {
        title: 'স্ক্যান টিপস',
        items: [
          'ভালো আলোতে ছবি তুলুন',
          'ফসলের কাছাকাছি থেকে তুলুন',
          'একাধিক কোণ থেকে তুলুন',
          'পরিষ্কার ছবি নিশ্চিত করুন'
        ]
      },
      examples: {
        title: 'উদাহরণ',
        good: 'ভালো ছবি',
        bad: 'খারাপ ছবি'
      }
    },
    en: {
      title: 'Crop Health Scanner',
      subtitle: 'Take a photo of your crops and get AI-powered health analysis',
      uploadBtn: 'Upload Image',
      takePhoto: 'Take Photo',
      analyzing: 'Analyzing...',
      scanAnother: 'Scan Another',
      results: {
        title: 'Scan Results',
        condition: 'Condition',
        confidence: 'Confidence',
        recommendation: 'Recommendation',
        details: 'Details'
      },
      conditions: {
        fresh: 'Fresh & Healthy',
        mild: 'Mild Damage',
        moderate: 'Moderate Damage',
        severe: 'Severe Damage',
        rotten: 'Rotten'
      },
      recommendations: {
        fresh: 'Crop condition is excellent. Wait for the right market price.',
        mild: 'Sell soon. Take to market within 1-2 days.',
        moderate: 'Sell immediately. Do not delay further.',
        severe: 'Separate damaged parts. Sell good portions quickly.',
        rotten: 'Not suitable for sale. Use for animal feed or compost.'
      },
      details: {
        fresh: 'No signs of decay or damage. Color and texture are normal.',
        mild: 'Slight discoloration visible. Decay may start soon.',
        moderate: 'Clear signs of spoilage. 30-40% affected.',
        severe: 'Extensive decay. 60-70% affected.',
        rotten: 'Completely spoiled. Unfit for human consumption.'
      },
      tips: {
        title: 'Scanning Tips',
        items: [
          'Take photos in good lighting',
          'Get close to the crop',
          'Capture from multiple angles',
          'Ensure clear focus'
        ]
      },
      examples: {
        title: 'Examples',
        good: 'Good Photo',
        bad: 'Bad Photo'
      }
    }
  };

  const t = content[lang];

  const formatNumber = (num) => {
    if (lang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num).replace(/\d/g, (digit) => bnDigits[digit]);
    }
    return num;
  };

  // Simulated AI analysis results (in real app, this would call TensorFlow.js or API)
  const analyzeImage = () => {
    setAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Random result for demo purposes
      const conditions = ['fresh', 'mild', 'moderate', 'severe', 'rotten'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-99%
      
      setResult({
        condition: randomCondition,
        confidence: confidence,
        timestamp: new Date().toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')
      });
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

  const handleScan = () => {
    if (image) {
      analyzeImage();
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getConditionColor = (condition) => {
    const colors = {
      fresh: 'bg-green-100 text-green-800 border-green-300',
      mild: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      moderate: 'bg-orange-100 text-orange-800 border-orange-300',
      severe: 'bg-red-100 text-red-800 border-red-300',
      rotten: 'bg-red-200 text-red-900 border-red-400'
    };
    return colors[condition] || colors.fresh;
  };

  const getConditionIcon = (condition) => {
    const icons = {
      fresh: '✅',
      mild: '⚠️',
      moderate: '🔶',
      severe: '🔴',
      rotten: '❌'
    };
    return icons[condition] || '✅';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              HG
            </div>
            <span className="font-bold text-lg text-gray-900">HarvestGuard</span>
          </div>
          
          <button 
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
          >
            {lang === 'bn' ? 'EN' : 'বাংলা'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📸</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Scanner Area */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {!image ? (
            // Upload State
            <div className="p-8">
              <div className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors">
                <div className="text-6xl mb-4">📷</div>
                <p className="text-gray-600 mb-6 text-lg">
                  {lang === 'bn' 
                    ? 'ফসলের ছবি আপলোড করুন বা তুলুন'
                    : 'Upload or take a photo of your crop'}
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <label
                    htmlFor="imageUpload"
                    className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 cursor-pointer inline-block transition-colors"
                  >
                    {t.takePhoto}
                  </label>
                  <label
                    htmlFor="imageUpload"
                    className="px-8 py-4 border-2 border-gray-300 rounded-lg font-medium text-lg hover:border-green-600 hover:text-green-600 cursor-pointer inline-block transition-colors"
                  >
                    {t.uploadBtn}
                  </label>
                </div>
              </div>
            </div>
          ) : (
            // Image Preview & Results
            <div>
              {/* Image Display */}
              <div className="relative">
                <img 
                  src={image} 
                  alt="Crop" 
                  className="w-full h-96 object-cover"
                />
                {analyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4 mx-auto"></div>
                      <p className="text-white text-xl font-medium">{t.analyzing}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!result && !analyzing && (
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-4">
                  <button
                    onClick={handleScan}
                    className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 transition-colors"
                  >
                    {lang === 'bn' ? 'বিশ্লেষণ শুরু করুন' : 'Start Analysis'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-4 border-2 border-gray-300 rounded-lg font-medium text-lg hover:border-red-500 hover:text-red-500 transition-colors"
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              )}

              {/* Results */}
              {result && !analyzing && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span>{getConditionIcon(result.condition)}</span>
                    <span>{t.results.title}</span>
                  </h2>

                  {/* Condition Card */}
                  <div className={`rounded-xl p-6 mb-6 border-2 ${getConditionColor(result.condition)}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm font-medium opacity-75 mb-1">
                          {t.results.condition}
                        </div>
                        <div className="text-3xl font-bold">
                          {t.conditions[result.condition]}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-75 mb-1">
                          {t.results.confidence}
                        </div>
                        <div className="text-3xl font-bold">
                          {formatNumber(result.confidence)}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-3 mb-2">
                      <div 
                        className="bg-current h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                    <div className="text-xs opacity-75">
                      {lang === 'bn' ? 'স্ক্যান সম্পন্ন: ' : 'Scanned: '}{result.timestamp}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      <span>{t.results.recommendation}</span>
                    </h3>
                    <p className="text-blue-800 text-lg">
                      {t.recommendations[result.condition]}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {t.results.details}
                    </h3>
                    <p className="text-gray-700">
                      {t.details[result.condition]}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 transition-colors"
                  >
                    {t.scanAnother}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tips Section */}
        {!image && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Scanning Tips */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>{t.tips.title}</span>
              </h3>
              <ul className="space-y-3">
                {t.tips.items.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span>
                <span>{t.examples.title}</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="font-medium text-gray-900">{t.examples.good}</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-sm text-gray-700">
                    {lang === 'bn' 
                      ? 'পরিষ্কার, উজ্জ্বল আলো, ফসলের কাছাকাছি'
                      : 'Clear, bright lighting, close to crop'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-600 text-xl">✗</span>
                    <span className="font-medium text-gray-900">{t.examples.bad}</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-sm text-gray-700">
                    {lang === 'bn' 
                      ? 'অস্পষ্ট, অন্ধকার, দূর থেকে তোলা'
                      : 'Blurry, dark, taken from far away'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How AI Works (Educational) */}
        {!image && (
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {lang === 'bn' ? '🤖 AI কীভাবে কাজ করে?' : '🤖 How Does AI Work?'}
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">📸</div>
                <h4 className="font-bold mb-2">
                  {lang === 'bn' ? '১. ছবি ক্যাপচার' : '1. Image Capture'}
                </h4>
                <p className="text-sm text-gray-600">
                  {lang === 'bn' 
                    ? 'আপনার ফসলের উচ্চ-মানের ছবি তুলুন'
                    : 'Take high-quality photo of your crop'}
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold mb-2">
                  {lang === 'bn' ? '২. AI বিশ্লেষণ' : '2. AI Analysis'}
                </h4>
                <p className="text-sm text-gray-600">
                  {lang === 'bn' 
                    ? 'মডেল রঙ, গঠন এবং পচনের চিহ্ন পরীক্ষা করে'
                    : 'Model checks color, texture, and decay signs'}
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-bold mb-2">
                  {lang === 'bn' ? '৩. ফলাফল' : '3. Results'}
                </h4>
                <p className="text-sm text-gray-600">
                  {lang === 'bn' 
                    ? 'তাৎক্ষণিক স্বাস্থ্য রিপোর্ট এবং পরামর্শ পান'
                    : 'Get instant health report and recommendations'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}