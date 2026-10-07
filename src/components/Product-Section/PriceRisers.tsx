import Link from 'next/link';

interface Change {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
}

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করার হেল্পার
const toBanglaNumber = (num: number | string): string => {
  const banglaDigits: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.',
  };
  return num
    .toString()
    .split('')
    .map((digit) => banglaDigits[digit] || digit)
    .join('');
};

// Unit বাংলা রূপান্তর
const getBanglaUnit = (unit: string): string => {
  const unitMap: { [key: string]: string } = {
    kg: 'প্রতি কেজি',
    liter: 'প্রতি লিটার',
    dozen: 'প্রতি ডজন',
    piece: 'প্রতি পিস',
    gm: 'প্রতি গ্রাম',
  };
  return unitMap[unit] || `প্রতি ${unit}`;
};

export default async function PriceRisers() {
  let products: Product[] = [];

  try {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
      next: { revalidate: 60 }, // ১ মিনিট পরপর রিক্যাশে হবে
    });

    if (res.ok) {
      const allProducts: Product[] = await res.json();

      // ১. দাম বেড়েছে (dir === 'up') এমন প্রডাক্ট ফিল্টার
      // ২. শতাংশ (pct) বড় থেকে ছোট ক্রমানুসারে সর্ট (Sorting)
      // ৩. প্রথম ৬ টি প্রোডাক্ট নির্বাচন
      products = allProducts
        .filter((item) => item.change?.dir === 'up')
        .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
        .slice(0, 6);
    }
  } catch (error) {
    console.error('Failed to fetch riser products:', error);
  }

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-500 text-sm">▲</span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block bg-[#f8f9f7] hover:bg-white hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-200"
          >
            {/* Header: Image & Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {product.image || product.categoryIcon || '🌾'}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
                  {product.nameBn}
                </h3>
                <p className="text-xs text-gray-500">
                  {getBanglaUnit(product.unit)}
                </p>
              </div>
            </div>

            {/* Bottom Row: Price & Percentage Change Badge */}
            <div className="flex items-end justify-between pt-2">
              <div>
                <span className="text-xs text-gray-500 block mb-0.5">
                  আজকের দাম
                </span>
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  {toBanglaNumber(product.today)} টাকা
                </span>
              </div>

              {/* Red Up Badge */}
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>▲</span>
                <span>{toBanglaNumber(product.change.pct)}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}