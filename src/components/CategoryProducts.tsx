"use client";

import { useState } from "react";
import Link from "next/link";

interface Change {
  dir: "up" | "down" | "flat";
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

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  gm: "প্রতি গ্রাম",
  gram: "প্রতি গ্রাম",
  ml: "প্রতি মিলি",
  packet: "প্রতি প্যাকেট",
  bundle: "প্রতি আঁটি",
};

const toBanglaNumber = (num: number | string): string => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

const getBanglaUnit = (unit: string): string => {
  return unitMap[unit] || `প্রতি ${unit}`;
};

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc"
  >("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.today - b.today;
    }

    if (sortBy === "price-desc") {
      return b.today - a.today;
    }

    return 0;
  });

  const categoryName = products[0]?.categoryNameBn || "পণ্যসমূহ";

  const categoryIcon =
    products[0]?.categoryIcon ||
    products[0]?.image ||
    "🌾";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* Category Banner Card */}
      <div className="bg-[#f4f7f4] rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0">
          {categoryIcon}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {categoryName}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {toBanglaNumber(products.length)}
            টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sorting Control Bar */}
      <div className="bg-[#f4f7f4] rounded-2xl p-4 border border-gray-100 flex items-center justify-end">
        <div className="flex items-center gap-3">

          <label
            htmlFor="sort"
            className="text-sm text-gray-600 font-medium"
          >
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => {
              const value = e.target.value;

              if (
                value === "default" ||
                value === "price-asc" ||
                value === "price-desc"
              ) {
                setSortBy(value);
              }
            }}
            className="bg-white border border-gray-200 text-gray-800 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="price-asc">
              দাম: কম থেকে বেশি
            </option>

            <option value="price-desc">
              দাম: বেশি থেকে কম
            </option>
          </select>

        </div>
      </div>

      {/* Counter text */}
      <p className="text-sm text-gray-500 font-medium">
        মোট {toBanglaNumber(sortedProducts.length)}
        টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {sortedProducts.map((product) => {
          const dir = product.change?.dir || "flat";
          const pct = product.change?.pct || 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block bg-[#f8f9f7] hover:bg-white hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-200"
            >

              {/* Product Top */}
              <div className="flex items-center gap-3 mb-4">

                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {product.image ||
                    product.categoryIcon ||
                    "🌾"}
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

              {/* Price */}
              <div className="flex items-end justify-between pt-2">

                <div>
                  <span className="text-xs text-gray-500 block mb-0.5">
                    আজকের দাম
                  </span>

                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    {toBanglaNumber(product.today)} টাকা
                  </span>
                </div>

                {/* UP */}
                {dir === "up" && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>▲</span>
                    <span>
                      {toBanglaNumber(pct)}%
                    </span>
                  </div>
                )}

                {/* DOWN */}
                {dir === "down" && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>▼</span>
                    <span>
                      {toBanglaNumber(pct)}%
                    </span>
                  </div>
                )}

                {/* FLAT */}
                {dir === "flat" && (
                  <div className="bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>—</span>
                    <span>
                      {toBanglaNumber(pct)}%
                    </span>
                  </div>
                )}

              </div>
            </Link>
          );
        })}

      </div>
    </div>
  );
}