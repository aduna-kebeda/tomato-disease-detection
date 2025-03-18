import { MapPin, Calendar, Building, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const FeatureSection = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Explore Destinations",
      description: "Discover beautiful locations across Ethiopia, from ancient churches to stunning landscapes",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Plan Itineraries",
      description: "Create and customize your perfect travel plan with our AI-powered itinerary builder",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Find Businesses",
      description: "Discover hotels, restaurants, and tour operators with authentic reviews and ratings",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "AI Recommendations",
      description: "Get personalized travel suggestions based on your preferences and interests",
      color: "bg-pink-100 text-pink-500",
    },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Ethiopia with Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform helps you explore Ethiopia's rich heritage and natural beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={cn("rounded-full p-6 mb-6", feature.color)}>{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureSection

