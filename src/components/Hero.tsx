import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  // Dynamic Bangla date generator
  const today = new Date();
  const banglaDateStr = today.toLocaleDateString('bn-BD', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-[#f4f7f4] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100/80 shadow-sm">
        {/* Left Side Content */}
        <div className="flex-1 space-y-4 text-left">
          {/* Eyebrow / Small Text */}
          <div className="inline-block bg-[#e2eee3] text-[#2c7a36] text-xs md:text-sm font-medium px-3 py-1 rounded-full">
            {banglaDateStr}
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Primary CTA Button (Anchor Link) */}
          <div className="pt-2">
            <Link
              href="#sob-ponno"
              className="inline-block bg-[#008a3e] hover:bg-[#007534] text-white font-medium text-sm md:text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Side Banner Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src="/bazar-hero.png" // Apnar image path app-er public folder e rakhten
              alt="বাজারের ঝুড়ি"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}