
"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 90) return previous;
        return Math.min(
          previous + Math.floor(Math.random() * 8) + 2,
          90
        );
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-100 px-5">
      {/* Background decoration */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />

      <div className="relative w-full max-w-sm rounded-3xl border border-emerald-100 bg-white/80 p-8 text-center shadow-xl shadow-emerald-900/5 backdrop-blur-xl">
        {/* Animated logo */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600 text-4xl text-white shadow-lg shadow-emerald-600/25">
          <span className="animate-pulse">🛒</span>
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Bazar <span className="text-emerald-600">Dor</span>
        </h1>

        <h2 className="mt-3 text-lg font-bold text-gray-800">
          লোড হচ্ছে...
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          আপনার পছন্দের পণ্য প্রস্তুত করা হচ্ছে।
          অনুগ্রহ করে একটু অপেক্ষা করুন।
        </p>

        {/* Progress percentage */}
        <div className="mt-8 flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-500">
            Loading products
          </span>
          <span className="tabular-nums text-emerald-700">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100"
          role="progressbar"
          aria-label="পেজ লোড হচ্ছে"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-600 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Animated loading dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:300ms]" />
        </div>

        <p className="mt-5 text-xs text-gray-400">
          আপনার কেনাকাটার অভিজ্ঞতা হোক সহজ ও সুন্দর।
        </p>
      </div>
    </main>
  );
}
