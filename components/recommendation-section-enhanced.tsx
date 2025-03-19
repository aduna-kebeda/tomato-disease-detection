"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star, Sparkles } from "lucide-react"
import SafetyIndicatorsEnhanced from "@/components/safety-indicators-enhanced"
const RecommendationSectionEnhanced = () => {
  const [interests, setInterests] = useState("cultural")
  const [duration, setDuration] = useState([7])
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Rock Churches of Lalibela",
      type: "destination",
      image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
      location: "Lalibela, Amhara",
      rating: 4.9,
      tags: ["UNESCO", "Historical", "Religious"],
      bestTime: "October - March",
    },
    {
      id: 2,
      title: "Historical Northern Circuit",
      type: "itinerary",
      image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
      location: "Northern Ethiopia",
      rating: 4.8,
      tags: ["Cultural", "Historical", "7 Days"],
      bestTime: "October - March",
    },
    {
      id: 3,
      title: "Timkat Festival",
      type: "event",
      image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
      location: "Gondar",
      rating: 4.7,
      tags: ["Cultural", "Religious", "Festival"],
      bestTime: "January",
    },
  ])

  const handleInterestChange = (value: string) => {
    setInterests(value)
    setIsLoading(true)

    // Simulate API call to get new recommendations
    setTimeout(() => {
      if (value === "adventure") {
        setRecommendations([
          {
            id: 4,
            title: "Simien Mountains Trek",
            type: "destination",
            image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
            location: "Simien Mountains",
            rating: 4.8,
            tags: ["Trekking", "Wildlife", "Nature"],
            bestTime: "September - April",
          },
          {
            id: 5,
            title: "Danakil Depression",
            type: "destination",
            image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
            location: "Afar Region",
            rating: 4.7,
            tags: ["Extreme", "Geological", "Unique"],
            bestTime: "November - February",
          },
          {
            id: 6,
            title: "Ethiopian Highlands Adventure",
            type: "itinerary",
            image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
            location: "Central Ethiopia",
            rating: 4.6,
            tags: ["Trekking", "Adventure", "10 Days"],
            bestTime: "September - April",
          },
        ])
      } else if (value === "cultural") {
        setRecommendations([
          {
            id: 1,
            title: "Rock Churches of Lalibela",
            type: "destination",
            image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
            location: "Lalibela, Amhara",
            rating: 4.9,
            tags: ["UNESCO", "Historical", "Religious"],
            bestTime: "October - March",
          },
          {
            id: 2,
            title: "Historical Northern Circuit",
            type: "itinerary",
            image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
            location: "Northern Ethiopia",
            rating: 4.8,
            tags: ["Cultural", "Historical", "7 Days"],
            bestTime: "October - March",
          },
          {
            id: 3,
            title: "Timkat Festival",
            type: "event",
            image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
            location: "Gondar",
            rating: 4.7,
            tags: ["Cultural", "Religious", "Festival"],
            bestTime: "January",
          },
        ])
      } else if (value === "wildlife") {
        setRecommendations([
          {
            id: 7,
            title: "Bale Mountains National Park",
            type: "destination",
            image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
            location: "Oromia Region",
            rating: 4.7,
            tags: ["Wildlife", "Nature", "Endemic Species"],
            bestTime: "October - April",
          },
          {
            id: 8,
            title: "Awash National Park",
            type: "destination",
            image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
            location: "Afar Region",
            rating: 4.5,
            tags: ["Safari", "Wildlife", "Birdwatching"],
            bestTime: "October - February",
          },
          {
            id: 9,
            title: "Ethiopian Wildlife Safari",
            type: "itinerary",
            image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
            location: "Multiple Regions",
            rating: 4.6,
            tags: ["Wildlife", "Photography", "8 Days"],
            bestTime: "October - March",
          },
        ])
      } else if (value === "food") {
        setRecommendations([
          {
            id: 10,
            title: "Ethiopian Coffee Trail",
            type: "itinerary",
            image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
            location: "Multiple Regions",
            rating: 4.8,
            tags: ["Coffee", "Culinary", "Cultural"],
            bestTime: "Year-round",
          },
          {
            id: 11,
            title: "Addis Ababa Food Tour",
            type: "itinerary",
            image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
            location: "Addis Ababa",
            rating: 4.7,
            tags: ["Food", "Urban", "Day Trip"],
            bestTime: "Year-round",
          },
          {
            id: 12,
            title: "Yod Abyssinia Cultural Restaurant",
            type: "destination",
            image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
            location: "Addis Ababa",
            rating: 4.9,
            tags: ["Restaurant", "Cultural Show", "Traditional Food"],
            bestTime: "Year-round",
          },
        ])
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleDurationChange = (value: number[]) => {
    setDuration(value)
    // In a real app, this would also trigger an API call
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-[#E61C5D] mr-2" />
            <span className="text-[#E61C5D] font-medium uppercase tracking-wider">AI-Powered</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Personalized <span className="text-[#E61C5D]">Recommendations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI analyzes your preferences to create the perfect Ethiopian experience just for you
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-medium mb-3">I'm interested in:</label>
              <Select value={interests} onValueChange={handleInterestChange}>
                <SelectTrigger className="h-14 text-lg border-pink-200 focus:border-pink-500 focus:ring-pink-500">
                  <SelectValue placeholder="Select your interests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cultural">Cultural & Historical</SelectItem>
                  <SelectItem value="adventure">Adventure & Nature</SelectItem>
                  <SelectItem value="wildlife">Wildlife & Safari</SelectItem>
                  <SelectItem value="food">Food & Culinary</SelectItem>
                  <SelectItem value="religious">Religious & Spiritual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-lg font-medium mb-3">Trip duration: {duration[0]} days</label>
              <div className="pt-4">
                <Slider
                  value={duration}
                  min={1}
                  max={21}
                  step={1}
                  onValueChange={handleDurationChange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1 day</span>
                  <span>7 days</span>
                  <span>14 days</span>
                  <span>21 days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Our AI will analyze your preferences and create personalized recommendations
            </p>
            <Button
              className="bg-[#E61C5D] hover:bg-pink-700 rounded-full text-lg py-6 px-8"
              onClick={() => handleInterestChange(interests)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Recommendations
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`capitalize ${
                      item.type === "destination"
                        ? "bg-blue-500"
                        : item.type === "itinerary"
                          ? "bg-pink-500"
                          : "bg-purple-500"
                    } text-white`}
                  >
                    {item.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1 text-[#E61C5D]" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{item.title}</h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1 text-[#E61C5D]" />
                  <span>Best time: {item.bestTime}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-pink-50 text-[#E61C5D] border-pink-200">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                  <Link href={`/${item.type}s/${item.id}`}>Explore</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendationSectionEnhanced

