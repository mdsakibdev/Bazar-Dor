import Link from 'next/link';

export default function Footer() {

  return (
    <footer className="w-full bg-[#f4f7f4] border-t border-gray-200 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/80">
          {/* Brand Info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 bg-[#008a3e] rounded-xl flex items-center justify-center text-white text-xl shadow-sm">
              🛒
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                বাজার দর
              </h2>
              <p className="text-xs text-gray-500">
                নিত্যপ্রয়োজনীয় পণ্যের সঠিক দামের নির্ভরযোগ্য মাধ্যম
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-[#008a3e] transition-colors">
              হোম
            </Link>
            <Link href="#sob-ponno" className="hover:text-[#008a3e] transition-colors">
              সব পণ্য
            </Link>
            <Link href="/about" className="hover:text-[#008a3e] transition-colors">
              আমাদের সম্পর্কে
            </Link>
            <Link href="/privacy" className="hover:text-[#008a3e] transition-colors">
              গোপনীয়তা নীতি
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}