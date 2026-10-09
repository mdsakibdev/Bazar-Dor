import ProductDetailView, {
  ProductDetail,
} from "@/components/ProductDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let product: ProductDetail | null = null;

  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  if(!product){
    notFound()
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-800">
          পণ্যটি পাওয়া যায়নি।
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          এই পণ্যের তথ্য বর্তমানে পাওয়া যাচ্ছে না।
        </p>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
}