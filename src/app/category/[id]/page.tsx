import CategoryProducts from "@/components/CategoryProducts";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Category products fetch failed");
  }

  const products = await res.json();

  if (!products || products.length === 0) {
    return (
      <div className="w-full min-h-[60vh] bg-[#f3f6f3] flex items-center justify-center px-4 py-16">
        <div className="bg-[#f8faf8] border border-gray-200/70 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-[#eaeaea] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            🌾
          </div>
          <p className="text-gray-700 font-medium text-base">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f6f3]">
      <CategoryProducts products={products} />
    </main>
  );
}