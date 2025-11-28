// Convert English digits to Bangla
exports.toBanglaDigits = (num) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bnDigits[digit]);
};

// Generate Bangla date
exports.toBanglaDate = (date) => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  
  const d = new Date(date);
  return `${exports.toBanglaDigits(d.getDate())} ${months[d.getMonth()]} ${exports.toBanglaDigits(d.getFullYear())}`;
};

// Calculate linear regression slope for trend
exports.calculateSlope = (values) => {
  const n = values.length;
  if (n < 2) return 0;
  
  const xSum = n * (n - 1) / 2;
  const ySum = values.reduce((sum, val) => sum + val, 0);
  const xySum = values.reduce((sum, val, i) => sum + (i * val), 0);
  const xxSum = n * (n - 1) * (2 * n - 1) / 6;
  
  const slope = (n * xySum - xSum * ySum) / (n * xxSum - xSum * xSum);
  return slope;
};