import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();

  return (
    <nav className="w-full border-y border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-x-auto px-2 sm:px-4 lg:px-6">
          <div className="flex min-w-max items-center justify-start gap-1 py-2 sm:gap-2">
            {data.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="
                  flex shrink-0 items-center
                  rounded-lg
                  px-3 py-2
                  text-sm font-bold
                  text-gray-700
                  transition-all
                  hover:bg-green-50
                  hover:text-green-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-green-500
                  sm:px-4
                  sm:py-2.5
                  sm:text-base
                "
              >
                <span className="mr-1.5 shrink-0 text-base sm:text-lg">
                  {category.icon}
                </span>

                <span className="whitespace-nowrap">
                  {category.nameBn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;