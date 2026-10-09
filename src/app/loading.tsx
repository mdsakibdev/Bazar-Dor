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

        {/* Loading text */}
        <h2 className="text-lg font-bold text-gray-800">
          লোড হচ্ছে...
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          অনুগ্রহ করে একটু অপেক্ষা করুন
        </p>

        
      </div>
    </main>
  );
}