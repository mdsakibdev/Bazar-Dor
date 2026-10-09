"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 90) return previous;
        return previous + Math.floor(Math.random() * 8) + 2;
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 px-5">
      {/* Background decoration */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />

      <div className="relative w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-7 flex justify-center">
          <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-emerald-600 text-4xl shadow-xl shadow-emerald-600/20">
            🛒
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Bazar<span className="text-emerald-600">dor</span>
        </h1>

        <p className="mt-2 text-sm font-medium text-gray-500">
          আপনার প্রতিদিনের বাজারদর
        </p>

        {/* Loading spinner */}
        <div className="my-9 flex justify-center">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-600 border-r-emerald-400" />
            <div className="absolute inset-3 rounded-full bg-emerald-100" />
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-lg font-bold text-gray-800">
          বাজারদরের তথ্য লোড হচ্ছে
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          আপনার জন্য সর্বশেষ পণ্যের দাম সংগ্রহ করা হচ্ছে।
          অনুগ্রহ করে একটু অপেক্ষা করুন।
        </p>

        {/* Progress bar */}
        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>লোড হচ্ছে...</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-xs font-medium text-gray-500 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          সঠিক বাজারদর, সহজেই
        </div>
      </div>
    </main>
  );
}