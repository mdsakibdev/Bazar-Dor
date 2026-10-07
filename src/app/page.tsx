import Hero from '@/components/Hero';
import AllProducts from '@/components/Product-Section/AllProducts';
import PriceFallers from '@/components/Product-Section/PriceFallers';
import PriceRisers from '@/components/Product-Section/PriceRisers';


export default async function HomePage() {
  let products = [];

  try {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch all products:', error);
  }

  return (
    <main>
      <Hero />
      <PriceRisers />
      <PriceFallers />
      <AllProducts initialProducts={products} />
    </main>
  );
}