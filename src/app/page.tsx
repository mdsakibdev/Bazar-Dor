import Hero from '@/components/Hero'
import AllProducts from '@/components/ProductSaction/AllProducts'
import PriceFallers from '@/components/ProductSaction/PriceFallers'
import PriceRisers from '@/components/ProductSaction/PriceRisers'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <PriceRisers/>
      <PriceFallers/>
      <AllProducts/>
    </div>
  )
}
