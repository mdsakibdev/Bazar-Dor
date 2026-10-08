import Link from "next/link";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Change {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface ProductDetail {
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
  change: Change;
  markets: Market[];
}

// ===============================
// Bangla Number
// ===============================
const toBanglaNumber = (value: number | string): string => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/\d/g, (digit) => {
    return banglaDigits[Number(digit)];
  });
};

// ===============================
// Bangla Unit
// ===============================
const getBanglaUnit = (unit: string): string => {
  const unitMap: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gm: "গ্রাম",
  };

  return unitMap[unit] || unit;
};

interface ProductDetailViewProps {
  product: ProductDetail;
}

export default function ProductDetailView({
  product,
}: ProductDetailViewProps) {
  // ===============================
  // Basic values
  // ===============================

  const markets = product.markets ?? [];

  const direction = product.change?.dir ?? "flat";

  const changePercentage = Math.abs(product.change?.pct ?? 0);

  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

  // ===============================
  // Find minimum market
  // ===============================

  const minMarket =
    markets.length > 0
      ? markets.reduce((lowest, current) =>
          current.min < lowest.min ? current : lowest
        )
      : null;

  // ===============================
  // Find maximum market
  // ===============================

  const maxMarket =
    markets.length > 0
      ? markets.reduce((highest, current) =>
          current.max > highest.max ? current : highest
        )
      : null;

  // ===============================
  // Overall minimum & maximum
  // ===============================

  const minPrice = minMarket?.min ?? product.today;

  const maxPrice = maxMarket?.max ?? product.today;

  // ===============================
  // Overall average
  // ===============================

  const totalAverage = markets.reduce((total, market) => {
    const marketAverage = (market.min + market.max) / 2;

    return total + marketAverage;
  }, 0);

  const overallAverage =
    markets.length > 0
      ? totalAverage / markets.length
      : product.today;

  const formattedAverage = Number.isInteger(overallAverage)
    ? overallAverage
    : Number(overallAverage.toFixed(1));

  // ===============================
  // Change UI
  // ===============================

  const isUp = direction === "up";
  const isDown = direction === "down";
  const isFlat = direction === "flat";

  const changeText = isUp
    ? "বেড়েছে"
    : isDown
      ? "কমেছে"
      : "অপরিবর্তিত";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-emerald-600"
      : "text-gray-500";

  const changeBg = isUp
    ? "bg-red-50"
    : isDown
      ? "bg-emerald-50"
      : "bg-gray-100";

  const changeIcon = isUp ? "↑" : isDown ? "↓" : "→";

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8 mt-10">
        <div className="space-y-5 sm:space-y-6 lg:space-y-8">

          {/* =========================================
              Breadcrumb
          ========================================== */}
         <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-medium">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            হোম
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-700 transition-colors"
          >
            {product.categoryNameBn}
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-800 font-semibold">{product.nameBn}</span>
        </nav>

          {/* =========================================
              Product Header
          ========================================== */}
          <section className="rounded-2xl border border-gray-100 bg-[#f4f7f4] p-4 sm:rounded-3xl sm:p-5 lg:p-6">
            <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Product Info */}
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
                  {product.categoryIcon || product.image}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h1 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl lg:text-3xl">
                    {product.nameBn}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                    <span>
                      প্রতি {getBanglaUnit(product.unit)}
                    </span>

                    <span className="text-gray-300">•</span>

                    <span>{product.categoryNameBn}</span>
                  </div>

                  {/* Price Change */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold sm:text-sm ${changeBg} ${changeColor}`}
                    >
                      <span>{changeIcon}</span>

                      {!isFlat && (
                        <span>
                          {toBanglaNumber(changePercentage)}%
                        </span>
                      )}

                      <span>{changeText}</span>
                    </span>

                    {!isFlat && (
                      <span className="text-xs text-gray-500 sm:text-sm">
                        গতকালের তুলনায়{" "}
                        {toBanglaNumber(priceDifference)} টাকা
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Today's Price */}
              <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:w-auto lg:min-w-[190px]">
                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  আজকের দাম
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {toBanglaNumber(product.today)}
                  </span>

                  <span className="pb-1 text-xs text-gray-500 sm:text-sm">
                    টাকা / {getBanglaUnit(product.unit)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              Price Summary
          ========================================== */}
          <section>
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                বাজারদরের সারসংক্ষেপ
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                বিভিন্ন বাজারের আজকের দামের উপর ভিত্তি করে
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">

              {/* Minimum */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 sm:text-sm">
                      সর্বনিম্ন দাম
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-emerald-600 sm:text-3xl">
                      ৳{toBanglaNumber(minPrice)}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                    ↓
                  </div>
                </div>

                <p className="mt-3 truncate text-xs text-gray-500 sm:text-sm">
                  {minMarket?.market ?? "কোনো বাজার নেই"}
                </p>
              </div>

              {/* Maximum */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 sm:text-sm">
                      সর্বোচ্চ দাম
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-red-600 sm:text-3xl">
                      ৳{toBanglaNumber(maxPrice)}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg">
                    ↑
                  </div>
                </div>

                <p className="mt-3 truncate text-xs text-gray-500 sm:text-sm">
                  {maxMarket?.market ?? "কোনো বাজার নেই"}
                </p>
              </div>

              {/* Average */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 sm:text-sm">
                      গড় দাম
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      ৳{toBanglaNumber(formattedAverage)}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                    ≈
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500 sm:text-sm">
                  {toBanglaNumber(markets.length)}টি বাজারের গড়
                </p>
              </div>
            </div>
          </section>

          {/* =========================================
              Market Prices
          ========================================== */}
          <section>
            <div className="mb-3 flex flex-col gap-1 sm:mb-4">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                বিভিন্ন বাজারের দাম
              </h2>

              <p className="text-xs text-gray-500 sm:text-sm">
                প্রতিটি বাজারে পাওয়া সর্বনিম্ন ও সর্বোচ্চ দাম
              </p>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-[#f8f9f7]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">

                  {/* Table Head */}
                  <thead>
                    <tr className="border-b border-gray-200 bg-[#f1f3f0] text-left">
                      <th className="min-w-[190px] px-4 py-3 text-xs font-bold text-gray-600 sm:px-5 sm:py-4 sm:text-sm">
                        বাজার
                      </th>

                      <th className="min-w-[130px] px-4 py-3 text-xs font-bold text-gray-600 sm:px-5 sm:py-4 sm:text-sm">
                        বিভাগ
                      </th>

                      <th className="min-w-[120px] px-4 py-3 text-xs font-bold text-gray-600 sm:px-5 sm:py-4 sm:text-sm">
                        সর্বনিম্ন
                      </th>

                      <th className="min-w-[120px] px-4 py-3 text-xs font-bold text-gray-600 sm:px-5 sm:py-4 sm:text-sm">
                        সর্বোচ্চ
                      </th>

                      <th className="min-w-[120px] px-4 py-3 text-xs font-bold text-gray-600 sm:px-5 sm:py-4 sm:text-sm">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {markets.map((market, index) => {
                      const marketAverage =
                        (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${index}`}
                          className="border-b border-gray-100 last:border-b-0 hover:bg-white"
                        >
                          {/* Market */}
                          <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-gray-500 shadow-sm">
                                {toBanglaNumber(index + 1)}
                              </span>

                              <span className="text-sm font-semibold text-gray-800">
                                {market.market}
                              </span>
                            </div>
                          </td>

                          {/* Division */}
                          <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-5 sm:py-4">
                            {market.division}
                          </td>

                          {/* Min */}
                          <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                            <span className="font-bold text-emerald-600">
                              ৳{toBanglaNumber(market.min)}
                            </span>
                          </td>

                          {/* Max */}
                          <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                            <span className="font-bold text-red-600">
                              ৳{toBanglaNumber(market.max)}
                            </span>
                          </td>

                          {/* Average */}
                          <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                            <span className="font-semibold text-gray-800">
                              ৳
                              {toBanglaNumber(
                                Number.isInteger(marketAverage)
                                  ? marketAverage
                                  : marketAverage.toFixed(1)
                              )}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile table hint */}
            {markets.length > 0 && (
              <p className="mt-2 text-center text-[11px] text-gray-400 sm:hidden">
                ← টেবিলটি দেখতে ডানে-বামে স্ক্রল করুন →
              </p>
            )}
          </section>

          {/* =========================================
              Price History
          ========================================== */}
          <section>
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                দামের ইতিহাস
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

              {/* Today */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4">
                <p className="text-xs text-gray-500">
                  আজ
                </p>

                <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                  ৳{toBanglaNumber(product.today)}
                </p>
              </div>

              {/* Yesterday */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4">
                <p className="text-xs text-gray-500">
                  গতকাল
                </p>

                <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                  ৳{toBanglaNumber(product.yesterday)}
                </p>
              </div>

              {/* Last Week */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4">
                <p className="text-xs text-gray-500">
                  গত সপ্তাহ
                </p>

                <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                  ৳{toBanglaNumber(product.lastWeek)}
                </p>
              </div>

              {/* Last Month */}
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9f7] p-4">
                <p className="text-xs text-gray-500">
                  গত মাস
                </p>

                <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                  ৳{toBanglaNumber(product.lastMonth)}
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}