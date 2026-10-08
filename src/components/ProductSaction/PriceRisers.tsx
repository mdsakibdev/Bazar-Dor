import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const toBanglaNumber = (num: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  gm: "প্রতি গ্রাম",
};

export default async function PriceRisers() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const products: Product[] = await res.json();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (risers.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-500 text-sm">▲</span>

        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {risers.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block bg-[#f8f9f7] hover:bg-white hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {product.image || product.categoryIcon || "🌾"}
              </div>

              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
                  {product.nameBn}
                </h3>

                <p className="text-xs text-gray-500">
                  {unitMap[product.unit] || `প্রতি ${product.unit}`}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between pt-2">
              <div>
                <span className="text-xs text-gray-500 block mb-0.5">
                  আজকের দাম
                </span>

                <span className="text-lg md:text-xl font-bold text-gray-900">
                  {toBanglaNumber(product.today)} টাকা
                </span>
              </div>

              <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>▲</span>
                <span>{toBanglaNumber(product.change.pct)}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
