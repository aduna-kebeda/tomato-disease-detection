import type { Metadata } from "next"
import AIRecommendationsClient from "./AIRecommendationsClient"
import SafetyIndicatorsEnhanced from "@/components/safety-indicators-enhanced"

export const metadata: Metadata = {
  title: "AI Recommendations | Ethiopia Travel Platform",
  description: "Get personalized travel recommendations powered by AI for your Ethiopian adventure",
}

export default function AIRecommendationsPage() {
  return (
    <div>
      <AIRecommendationsClient />
      <SafetyIndicatorsEnhanced />
    </div>
  )
}