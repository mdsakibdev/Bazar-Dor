"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  change: {
    dir: "up" | "down";
    pct: number;
  };
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

const toBanglaNumber = (num: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
      );

      const data: Product[] = await res.json();

      setProducts(data);
    };

    getProducts();
  }, []);

  const displayedProducts = showAll
    ? products
    : products.slice(0, 10);

  return (
    <section id="sob-ponno" className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="mb-5 ">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          সব পণ্য
        </h2>

        <p className="text-xs font-bold text-gray-700  mt-1">
          মোট {toBanglaNumber(products.length)}টি পণ্য
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayedProducts.map((product) => {
          const isUp = product.change.dir === "up";

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="
                h-22
                rounded-xl
                border border-gray-200
                bg-white
                px-3
                py-2.5
                transition-all
                hover:-translate-y-0.5
                hover:shadow-sm
              "
            >
              {/* Product Info */}
              <div className="flex items-center gap-2">
                {/* Product Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#f4f5ef] flex items-center justify-center text-lg shrink-0">
                  {product.image || product.categoryIcon || "🌾"}
                </div>

                {/* Name & Unit */}
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-gray-900 truncate">
                    {product.nameBn}
                  </h3>

                  <p className="text-[9px] text-gray-500">
                    {unitMap[product.unit] || `প্রতি ${product.unit}`}
                  </p>
                </div>
              </div>

              {/* Price & Change */}
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-[9px] text-gray-500 leading-none mb-1">
                    আজকের দাম
                  </p>

                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {toBanglaNumber(product.today)} টাকা
                  </p>
                </div>

                {/* Price Change */}
                {isUp ? (
                  <div className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-600">
                    <span>▲</span>
                    <span>
                      {toBanglaNumber(product.change.pct)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                    <span>▼</span>
                    <span>
                      {toBanglaNumber(product.change.pct)}%
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Show More */}
      {!showAll && products.length > 10 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="
              inline-block bg-[#008a3e] hover:bg-[#007534] text-white font-medium text-sm md:text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200
            "
          >
            সব পণ্য দেখুন ({toBanglaNumber(products.length)})
          </button>
        </div>
      )}

      {/* Show Less */}
      {showAll && products.length > 10 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(false)}
            className="
            mt-10
              inline-block bg-[#008a3e] hover:bg-[#007534] text-white font-medium text-sm md:text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200
            "
          >
            কম দেখুন
          </button>
        </div>
      )}
    </section>
  );
};

export default AllProducts;