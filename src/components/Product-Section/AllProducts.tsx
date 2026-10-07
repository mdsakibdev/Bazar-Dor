'use client';

import { useState } from 'react';
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

interface AllProductsProps {
  initialProducts: Product[];
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

export default function AllProducts({ initialProducts }: AllProductsProps) {
  const [showAll, setShowAll] = useState(false);

  // Default initial view: 10 items
  const displayedProducts = showAll
    ? initialProducts
    : initialProducts.slice(0, 10);

  return (
    <section id="sob-ponno" className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          সব পণ্য
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          মোট {toBanglaNumber(initialProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product) => {
          const dir = product.change?.dir || 'flat';
          const pct = product.change?.pct || 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block bg-[#f8f9f7] hover:bg-white hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-200"
            >
              {/* Header: Icon & Product Info */}
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

              {/* Bottom Row: Price & Dynamic Change Badge */}
              <div className="flex items-end justify-between pt-2">
                <div>
                  <span className="text-xs text-gray-500 block mb-0.5">
                    আজকের দাম
                  </span>
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    {toBanglaNumber(product.today)} টাকা
                  </span>
                </div>

                {/* Change Badge (Red up, Green down, Gray flat) */}
                {dir === 'up' && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>▲</span>
                    <span>{toBanglaNumber(pct)}%</span>
                  </div>
                )}

                {dir === 'down' && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>▼</span>
                    <span>{toBanglaNumber(pct)}%</span>
                  </div>
                )}

                {dir === 'flat' && (
                  <div className="bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>—</span>
                    <span>{toBanglaNumber(pct)}%</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Show More / Show Less Button */}
      {!showAll && initialProducts.length > 10 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="bg-[#008a3e] hover:bg-[#007534] text-white font-medium text-sm md:text-base px-8 py-3 rounded-xl shadow-md transition-all duration-200"
          >
            সব পণ্য দেখুন ({toBanglaNumber(initialProducts.length)})
          </button>
        </div>
      )}
    </section>
  );
}