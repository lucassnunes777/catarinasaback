import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedListings } from '@/components/sections/FeaturedListings'
import { AboutMeSummary } from '@/components/sections/AboutMeSummary'
import { CTASection } from '@/components/sections/CTASection'

export default function Page() {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <AboutMeSummary />
      <CTASection />
    </>
  )
}


