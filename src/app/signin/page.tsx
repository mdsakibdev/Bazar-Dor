'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('ইমেইল এবং পাসওয়ার্ড দেওয়া বাধ্যতামূলক');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || 'সাইন ইন করতে ব্যর্থ হয়েছে!');
        return;
      }

      toast.success('সফলভাবে সাইন ইন হয়েছে!');
      router.push('/');
    } catch {
      toast.error('একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: 'google' | 'github'
  ) => {
    setLoading(true);

    try {
      await signIn.social({
        provider,
        callbackURL: '/',
      });
    } catch {
      toast.error(`${provider} দিয়ে প্রবেশ ব্যর্থ হয়েছে`);
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6f4] px-4 py-8 sm:py-12">
      {/* Header Info */}
      <header className="mb-6 w-full max-w-md space-y-2 text-center sm:mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          সাইন ইন
        </h1>

        <p className="text-xs font-medium leading-relaxed text-gray-500 sm:text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </header>

      {/* Main Card */}
      <section className="w-full max-w-md space-y-5 rounded-3xl border border-gray-200/60 bg-white p-5 shadow-sm sm:p-7 md:p-8">
        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="signin-email"
              className="block text-xs font-semibold text-gray-800 sm:text-sm"
            >
              ইমেইল
            </label>

            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="signin-password"
              className="block text-xs font-semibold text-gray-800 sm:text-sm"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#008a3e] px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#007534] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                <span>অপেক্ষা করুন...</span>
              </>
            ) : (
              'সাইন ইন'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="w-full border-t border-gray-200" />

          <span className="absolute bg-white px-3 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200/80 bg-[#f9fbf9] px-3 py-3 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            <Image
              src="/googlelog.png"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />

            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('github')}
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200/80 bg-[#f9fbf9] px-3 py-3 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            <Image
              src="/githublogo.png"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />

            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Redirect Link */}
        <p className="pt-1 text-center text-xs leading-relaxed text-gray-600 sm:text-sm">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href="/signup"
            className="font-bold text-[#008a3e] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </section>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="mt-5 text-center text-xs font-medium text-gray-500 transition-colors hover:text-gray-800 sm:mt-6 sm:text-sm"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
