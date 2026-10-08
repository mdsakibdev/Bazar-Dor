import Link from "next/link";

interface Category {
  id: string;
  nameBn: string;
  icon?: string;
}

const Navlinks = async ({
  currentCategory,
}: {
  currentCategory?: string;
}) => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "no-store",
    }
  );

  const categories: Category[] = await res.json();

  return (
    <nav className="border-t border-b border-gray-100 bg-white  py-2.5">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto text-sm text-gray-700 font-medium">
        {categories.map((category) => {
          const isActive = currentCategory === category.id;

          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                isActive
                  ? "text-green-600 font-semibold border-b-2 border-green-600 pb-0.5"
                  : "hover:text-green-600"
              }`}
            >
              {category.icon && <span>{category.icon}</span>}

              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navlinks;
