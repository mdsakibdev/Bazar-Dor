"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInpo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  // Skeleton Loader matching layout
  if (isPending) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-stone-200 animate-pulse"></div>
        <div className="space-y-1.5">
          <div className="w-24 h-3.5 bg-stone-200 rounded animate-pulse"></div>
          <div className="w-12 h-2.5 bg-stone-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
   <div>
      {user ? (
        // Logged In User
        <div className="flex items-center gap-3">
          {/* User Profile */}
          <div className="flex items-center gap-2">
           <Link href={'/profile'}>
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={user?.image as string}
                  alt={user.name || "User profile"}
                />
              </div>
            </div>
           </Link>

            <div className="hidden sm:block">
              <h2 className="text-sm font-semibold text-gray-800">
                {user.name}
              </h2>

              <p className="text-xs text-gray-500">
                Welcome back!
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Link href={"/signIn"}>
          <button
            onClick={handleSignOut}
            className="btn btn-sm md:btn-md rounded-lg bg-green-600 px-4 text-white border-none hover:bg-green-700 transition-colors"
          >
            সাইন আউট
          </button>
          </Link>
        </div>
      ) : (
        // Logged Out User
        <div className="flex items-center gap-2">
          {/* Sign In */}
          <Link href="/signin">
            <button className="btn btn-sm md:btn-md rounded-lg border border-gray-300 bg-white px-4 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors">
              সাইন ইন
            </button>
          </Link>

          {/* Sign Up */}
          <Link href="/signup">
            <button className="btn btn-sm md:btn-md rounded-lg bg-green-600 px-4 text-white border-none hover:bg-green-700 transition-colors">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInpo;