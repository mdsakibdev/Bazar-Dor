"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newUserData = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
        };

        try {
            setIsUpdating(true);

            const { error } = await authClient.updateUser({
                name: newUserData.name,
                image: newUserData.image,
            });

            if (error) {
                toast.error(error.message ?? "প্রোফাইল আপডেট ব্যর্থ হয়েছে");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("একটি সমস্যা হয়েছে! আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    // Logged out state
    if (!user) {
        return (
            <div className="min-h-[70vh] bg-[#f4f6f4] flex items-center justify-center px-4 py-12">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200/60 shadow-sm text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-[#008a3e] rounded-full flex items-center justify-center text-3xl mx-auto">
                        👤
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        প্রোফাইল দেখতে সাইন ইন করুন
                    </h2>
                    <p className="text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য ও সেটিংস পরিবর্তন করতে প্রথমে সাইন ইন করুন।
                    </p>
                    <Link
                        href="/signin"
                        className="inline-block bg-[#008a3e] hover:bg-[#007534] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm"
                    >
                        সাইন ইন করুন
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f6f4] px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-medium">
                    <Link href="/" className="hover:text-[#008a3e] transition-colors">
                        হোম
                    </Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-900 font-semibold">প্রোফাইল</span>
                </nav>

                {/* Main Profile Container Card */}
                <div className="bg-white border border-gray-200/60 rounded-3xl shadow-sm overflow-hidden">

                    {/* Top Banner Accent */}
                    <div className="h-32 sm:h-40 bg-gradient-to-r from-[#008a3e] via-[#00a84c] to-[#40c068] relative"></div>

                    {/* Profile Details Container */}
                    <div className="px-5 sm:px-8 pb-8">

                        {/* Avatar Row */}
                        <div className="-mt-14 sm:-mt-16 mb-5 flex items-end justify-between">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl ring-4 ring-white shadow-md bg-stone-100 overflow-hidden flex items-center justify-center text-3xl font-bold text-[#008a3e] shrink-0">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || "User profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span>{user.name?.charAt(0) || "U"}</span>
                                )}
                            </div>

                            {/* Edit Profile Action Button */}
                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="bg-[#e2eee3] text-[#008a3e] border border-[#008a3e]/20 hover:bg-[#008a3e] hover:text-white font-semibold text-xs md:text-sm px-4 py-2 rounded-xl transition-all shadow-xs"
                                >
                                    প্রোফাইল এডিট করুন
                                </button>
                            )}
                        </div>

                        {/* Header Info */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                                    {user.name}
                                </h1>

                                {user.emailVerified && (
                                    <span className="bg-emerald-50 text-[#008a3e] border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                        ✓ ভেরিফাইড
                                    </span>
                                )}
                            </div>

                            <p className="text-xs sm:text-sm text-gray-500 font-medium break-all">
                                {user.email}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        {/* Conditional Render: Form vs Info Cards */}
                        {isEditing ? (
                            /* Edit Profile Form */
                            <form onSubmit={handleUpdateProfile} className="space-y-5">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        তথ্য পরিবর্তন করুন
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        আপনার নাম এবং প্রোফাইল ইমেজের নতুন লিংক সেট করুন।
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {/* Name Input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-800 block">
                                            পূর্ণ নাম
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={user.name}
                                            required
                                            placeholder="আপনার নাম লিখুন"
                                            className="w-full bg-[#f9fbf9] border border-gray-200 rounded-xl px-4 py-2.5 text-xs md:text-sm outline-none focus:ring-2 focus:ring-[#008a3e] focus:bg-white transition-all text-gray-900"
                                        />
                                    </div>

                                    {/* Image URL Input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-800 block">
                                            প্রোফাইল ছবির লিংক (URL)
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            defaultValue={user.image || ""}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full bg-[#f9fbf9] border border-gray-200 rounded-xl px-4 py-2.5 text-xs md:text-sm outline-none focus:ring-2 focus:ring-[#008a3e] focus:bg-white transition-all text-gray-900"
                                        />
                                        <p className="text-[11px] text-gray-400 pt-0.5">
                                            একটি সঠিক ইমেজের ওয়েব এড্রেস (Direct image link) ব্যবহার করুন।
                                        </p>
                                    </div>
                                </div>

                                {/* Form Buttons */}
                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-1 bg-[#008a3e] hover:bg-[#007534] text-white font-bold py-2.5 rounded-xl text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                আপডেট হচ্ছে...
                                            </>
                                        ) : (
                                            "সংরক্ষণ করুন"
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        disabled={isUpdating}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-xs md:text-sm transition-all"
                                    >
                                        বাতিল করুন
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* Display Profile Information */
                            <div className="space-y-4">
                                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                    অ্যাকাউন্টের তথ্য
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Full Name Box */}
                                    <div className="bg-[#f9fbf9] border border-gray-200/70 rounded-2xl p-4">
                                        <p className="text-xs text-gray-500 font-medium mb-1">
                                            পূর্ণ নাম
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm md:text-base">
                                            {user.name}
                                        </p>
                                    </div>

                                    {/* Email Address Box */}
                                    <div className="bg-[#f9fbf9] border border-gray-200/70 rounded-2xl p-4">
                                        <p className="text-xs text-gray-500 font-medium mb-1">
                                            ইমেইল ঠিকানা
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm md:text-base break-all">
                                            {user.email}
                                        </p>
                                    </div>

                                    {/* Email Verification Box */}
                                    <div className="bg-[#f9fbf9] border border-gray-200/70 rounded-2xl p-4">
                                        <p className="text-xs text-gray-500 font-medium mb-1">
                                            ইমেইল স্ট্যাটাস
                                        </p>
                                        <p
                                            className={`font-bold text-sm md:text-base ${user.emailVerified
                                                    ? "text-[#008a3e]"
                                                    : "text-amber-600"
                                                }`}
                                        >
                                            {user.emailVerified
                                                ? "✓ ইমেইল ভেরিফাইড"
                                                : "⚠ ইমেইল ভেরিফাইড নয়"}
                                        </p>
                                    </div>

                                    {/* User ID Box */}
                                    <div className="bg-[#f9fbf9] border border-gray-200/70 rounded-2xl p-4">
                                        <p className="text-xs text-gray-500 font-medium mb-1">
                                            ইউজার আইডি
                                        </p>
                                        <p className="font-mono text-xs text-gray-700 break-all pt-0.5">
                                            {user.id}
                                        </p>
                                    </div>
                                </div>

                                {/* Welcome / Status Message Box */}
                                <div className="mt-6 bg-[#e2eee3] border border-[#008a3e]/20 rounded-2xl p-4 flex items-center gap-3">
                                    <span className="text-xl">🎉</span>
                                    <p className="text-xs md:text-sm text-[#008a3e] font-medium">
                                        স্বাগতম, <span className="font-bold">{user.name}</span>! আপনার অ্যাকাউন্টটি সক্রিয় আছে এবং ব্যবহার করার জন্য প্রস্তুত।
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;