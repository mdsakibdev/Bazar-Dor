'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import Image from 'next/image';

type SocialProvider = 'google' | 'github';

const Spinner = () => (
  <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />
);

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  const router = useRouter();
  const busy = loading || socialLoading !== null;

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error('সবগুলো ঘর পূরণ করা বাধ্যতামূলক');
      return;
    }

    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুইটি মিলছে না');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || 'নিবন্ধন ব্যর্থ হয়েছে!');
        return;
      }

      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন সাইন ইন করুন।');
      router.push('/signin');
    } catch {
      toast.error('একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: SocialProvider) => {
    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: '/',
      });

      if (error) {
        toast.error(error.message || `${provider} দিয়ে প্রবেশ ব্যর্থ হয়েছে`);
        setSocialLoading(null);
      }
    } catch {
      toast.error(`${provider} দিয়ে প্রবেশ ব্যর্থ হয়েছে`);
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6f4] px-4 py-8 sm:py-12">
      <header className="mb-6 w-full max-w-md space-y-2 text-center sm:mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-xs font-medium leading-relaxed text-gray-500 sm:text-sm">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </header>

      <section className="w-full max-w-md space-y-5 rounded-3xl border border-gray-200/60 bg-white p-5 shadow-sm sm:p-7 md:p-8">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="signup-name"
              className="block text-xs font-semibold text-gray-800 sm:text-sm"
            >
              নাম
            </label>

            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              disabled={busy}
              required
              className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-email"
              className="block text-xs font-semibold text-gray-800 sm:text-sm"
            >
              ইমেইল
            </label>

            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={busy}
              required
              className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-password"
              className="block text-xs font-semibold text-gray-800 sm:text-sm"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              disabled={busy}
              required
              minLength={8}
              className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-confirm-password"
              className="block text-xs font-semibold text-gray-800 sm:text-sm"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              disabled={busy}
              required
              className="w-full rounded-xl border border-gray-200 bg-[#f9fbf9] px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#008a3e] px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#007534] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Spinner />
                <span>অপেক্ষা করুন...</span>
              </>
            ) : (
              'অ্যাকাউন্ট তৈরি করুন'
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center py-1">
          <div className="w-full border-t border-gray-200" />

          <span className="absolute bg-white px-3 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            disabled={busy}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200/80 bg-[#f9fbf9] px-3 py-3 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            {socialLoading === 'google' ? (
              <Spinner />
            ) : (
              <Image
                src="/googlelog.png"
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
            )}

            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('github')}
            disabled={busy}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200/80 bg-[#f9fbf9] px-3 py-3 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            {socialLoading === 'github' ? (
              <Spinner />
            ) : (
              <Image
                src="/githublogo.png"
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
            )}

            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="pt-1 text-center text-xs leading-relaxed text-gray-600 sm:text-sm">
          অ্যাকাউন্ট আছে?{' '}
          <Link
            href="/signin"
            className="font-bold text-[#008a3e] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </section>

      <Link
        href="/"
        className="mt-5 text-center text-xs font-medium text-gray-500 transition-colors hover:text-gray-800 sm:mt-6 sm:text-sm"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}