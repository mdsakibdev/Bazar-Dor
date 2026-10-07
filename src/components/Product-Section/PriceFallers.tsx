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

// English to Bangla number conversion helper
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
    ',': ',',
  };
  return num
    .toLocaleString('en-US')
    .split('')
    .map((digit) => banglaDigits[digit] || digit)
    .join('');
};

// Bangla unit helper
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

export default async function PriceFallers() {
  let products: Product[] = [];

  try {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const allProducts: Product[] = await res.json();

      // 1. Filter products with price drops (dir === 'down')
      // 2. Sort descending by percentage drop (pct)
      // 3. Take top 6 items
      products = allProducts
        .filter((item) => item.change?.dir === 'down')
        .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
        .slice(0, 6);
    }
  } catch (error) {
    console.error('Failed to fetch faller products:', error);
  }

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-emerald-600 text-sm">▼</span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          আজ দাম কমেছে
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
            {/* Top Row: Icon & Product Info */}
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

            {/* Bottom Row: Price & Percentage Badge */}
            <div className="flex items-end justify-between pt-2">
              <div>
                <span className="text-xs text-gray-500 block mb-0.5">
                  আজকের দাম
                </span>
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  {toBanglaNumber(product.today)} টাকা
                </span>
              </div>

              {/* Green Down Badge */}
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>▼</span>
                <span>{toBanglaNumber(product.change.pct)}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}