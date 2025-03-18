"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star } from "lucide-react"

const RecommendationSection = () => {
  const [interests, setInterests] = useState("cultural")
  const [duration, setDuration] = useState([7])
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Rock Churches of Lalibela",
      type: "destination",
      image: "/placeholder.svg?height=400&width=600",
      location: "Lalibela, Amhara",
      rating: 4.9,
      tags: ["UNESCO", "Historical", "Religious"],
      bestTime: "October - March",
    },
    {
      id: 2,
      title: "Historical Northern Circuit",
      type: "itinerary",
      image: "/placeholder.svg?height=400&width=600",
      location: "Northern Ethiopia",
      rating: 4.8,
      tags: ["Cultural", "Historical", "7 Days"],
      bestTime: "October - March",
    },
    {
      id: 3,
      title: "Timkat Festival",
      type: "event",
      image: "/placeholder.svg?height=400&width=600",
      location: "Gondar",
      rating: 4.7,
      tags: ["Cultural", "Religious", "Festival"],
      bestTime: "January",
    },
  ])

  const handleInterestChange = (value: string) => {
    setInterests(value)
    // In a real app, this would trigger an API call to get new recommendations
    // For now, we'll just simulate different recommendations
    if (value === "adventure") {
      setRecommendations([
        {
          id: 4,
          title: "Simien Mountains Trek",
          type: "destination",
          image: "/placeholder.svg?height=400&width=600",
          location: "Simien Mountains",
          rating: 4.8,
          tags: ["Trekking", "Wildlife", "Nature"],
          bestTime: "September - April",
        },
        {
          id: 5,
          title: "Danakil Depression",
          type: "destination",
          image: "/placeholder.svg?height=400&width=600",
          location: "Afar Region",
          rating: 4.7,
          tags: ["Extreme", "Geological", "Unique"],
          bestTime: "November - February",
        },
        {
          id: 6,
          title: "Ethiopian Highlands Adventure",
          type: "itinerary",
          image: "/placeholder.svg?height=400&width=600",
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
          image: "/placeholder.svg?height=400&width=600",
          location: "Lalibela, Amhara",
          rating: 4.9,
          tags: ["UNESCO", "Historical", "Religious"],
          bestTime: "October - March",
        },
        {
          id: 2,
          title: "Historical Northern Circuit",
          type: "itinerary",
          image: "/placeholder.svg?height=400&width=600",
          location: "Northern Ethiopia",
          rating: 4.8,
          tags: ["Cultural", "Historical", "7 Days"],
          bestTime: "October - March",
        },
        {
          id: 3,
          title: "Timkat Festival",
          type: "event",
          image: "/placeholder.svg?height=400&width=600",
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
          image: "/placeholder.svg?height=400&width=600",
          location: "Oromia Region",
          rating: 4.7,
          tags: ["Wildlife", "Nature", "Endemic Species"],
          bestTime: "October - April",
        },
        {
          id: 8,
          title: "Awash National Park",
          type: "destination",
          image: "/placeholder.svg?height=400&width=600",
          location: "Afar Region",
          rating: 4.5,
          tags: ["Safari", "Wildlife", "Birdwatching"],
          bestTime: "October - February",
        },
        {
          id: 9,
          title: "Ethiopian Wildlife Safari",
          type: "itinerary",
          image: "/placeholder.svg?height=400&width=600",
          location: "Multiple Regions",
          rating: 4.6,
          tags: ["Wildlife", "Photography", "8 Days"],
          bestTime: "October - March",
        },
      ])
    }
  }

  const handleDurationChange = (value: number[]) => {
    setDuration(value)
    // In a real app, this would also trigger an API call
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Personalized Recommendations</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered travel recommendations based on your interests and preferences
        </p>
      </div>

      <div className="bg-muted rounded-lg p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">I'm interested in:</label>
            <Select value={interests} onValueChange={handleInterestChange}>
              <SelectTrigger>
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
            <label className="block text-sm font-medium mb-2">Trip duration: {duration[0]} days</label>
            <Slider value={duration} min={1} max={21} step={1} onValueChange={handleDurationChange} className="py-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="capitalize bg-primary">{item.type}</Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{item.title}</h3>

              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Best time: {item.bestTime}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button asChild className="w-full">
                <Link href={`/${item.type}s/${item.id}`}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default RecommendationSection

