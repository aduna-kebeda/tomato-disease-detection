import HeroEnhanced from "@/components/hero-enhanced"
import FeatureSection from "@/components/feature-section"
import TourPlansSection from "@/components/tour-plans-section"
import AboutSection from "@/components/about-section"
import DestinationsGrid from "@/components/destinations-grid"
import RecommendationSectionEnhanced from "@/components/recommendation-section-enhanced"
import SafetyIndicatorsEnhanced from "@/components/safety-indicators-enhanced"
import TestimonialsSectionEnhanced from "@/components/testimonials-section-enhanced"
import PopularItinerariesEnhanced from "@/components/popular-itineraries-enhanced"
import UpcomingEventsEnhanced from "@/components/upcoming-events-enhanced"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroEnhanced />
      <FeatureSection />
      <AboutSection />
      <DestinationsGrid />
      <PopularItinerariesEnhanced />
      <RecommendationSectionEnhanced />
      <UpcomingEventsEnhanced />
      <SafetyIndicatorsEnhanced />
      <TestimonialsSectionEnhanced />
      <TourPlansSection />
    </div>
  )
}

