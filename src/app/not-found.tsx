import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#f4f6f4] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200/60 shadow-sm text-center space-y-6">
        
        {/* Animated / Friendly Emoji Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 bg-[#e2eee3] rounded-3xl flex items-center justify-center text-5xl shadow-inner">
            🔍
          </div>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white font-black text-xs px-2 py-0.5 rounded-full shadow-sm">
            ৪০৪
          </span>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            পেইজটি পাওয়া যায়নি!
          </h1>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            আপনি যে ঠিকানাটি খুঁজছেন তা হয়তো পরিবর্তন করা হয়েছে অথবা স্থায়ীভাবে সরিয়ে ফেলা হয়েছে।
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#008a3e] hover:bg-[#007534] text-white font-bold px-6 py-3 rounded-xl text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>🏠</span> হোম পেজে ফিরে যান
          </Link>
          
          <Link
            href="/#sob-ponno"
            className="w-full sm:w-auto bg-[#f9fbf9] hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold px-6 py-3 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>🛒</span> সব পণ্য দেখুন
          </Link>
        </div>

      </div>
    </div>
  );
}