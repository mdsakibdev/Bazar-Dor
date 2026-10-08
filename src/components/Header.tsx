import Image from "next/image";
import Link from "next/link";
import BanglaDate from "./BanglaDate";
import UserInpo from "./UserInpo";
import Navlinks from "./NavLinks";
import Marquee from "./Merquee";



export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Top Header */}
      <div className="mx-auto flex min-h-22 max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:gap-5 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-xl outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-green-600 sm:gap-3"
        >
          {/* Logo Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-300 sm:h-12 sm:w-12">
            <Image
              src="/logo.png"
              alt="বাজার দর Logo"
              width={30}
              height={30}
              className="h-6 w-6 object-contain sm:h-7.5 sm:w-7.5"
              priority
            />
          </div>

          {/* Logo Text */}
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="mt-0.5 truncate text-[10px] font-medium text-gray-500 sm:text-sm">
              <BanglaDate/>
            </p>
          </div>
        </Link>

        {/* User / Auth */}
        <div className="shrink-0">
          <UserInpo />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="w-full">
        <Navlinks/>
      </div>

      <Marquee/>

    </header>
  );
}
