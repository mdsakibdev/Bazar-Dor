
import Link from "next/link";
import MarqueeText from "react-marquee-text";

type Product = {
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
};

const unitMap: Record<string, string> = {
  kg: "কেজি",
  gram: "গ্রাম",
  liter: "লিটার",
  ml: "মিলি",
  piece: "পিস",
  dozen: "ডজন",
  packet: "প্যাকেট",
  bundle: "আঁটি",
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const products: Product[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-b border-gray-200 bg-white py-2.5">
      <MarqueeText direction="right" duration={20} pauseOnHover>
        <div className="flex items-center">
          {products.map((product) => {
            const isUp = product.change.dir === "up";
            const unit = unitMap[product.unit] ?? product.unit;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 text-sm transition-colors hover:bg-gray-50 sm:px-6"
              >
                {/* Product Icon */}
                <span className="text-base sm:text-lg">
                  {product.image || product.categoryIcon}
                </span>

                {/* Product Name */}
                <span className="whitespace-nowrap font-medium text-gray-800">
                  {product.nameBn}
                </span>

                {/* Price */}
                <span className="whitespace-nowrap font-semibold text-gray-900">
                  {product.today} টাকা/{unit}
                </span>

                {/* Price Change */}
                <span
                  className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                    isUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  <span>{product.change.pct}%</span>
                </span>
              </Link>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
