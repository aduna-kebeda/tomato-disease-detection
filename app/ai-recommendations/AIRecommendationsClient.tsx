"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Star, Sparkles, Search, Filter, Clock, ArrowRight, Loader2 } from "lucide-react"

// Sample recommendation data
const recommendationData = {
  destinations: [
    {
      id: 1,
      title: "Rock Churches of Lalibela",
      type: "destination",
      image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
      location: "Lalibela, Amhara",
      rating: 4.9,
      tags: ["UNESCO", "Historical", "Religious"],
      bestTime: "October - March",
      category: "Cultural",
    },
    {
      id: 2,
      title: "Danakil Depression",
      type: "destination",
      image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
      location: "Afar Region",
      rating: 4.7,
      tags: ["Extreme", "Geological", "Unique"],
      bestTime: "November - February",
      category: "Adventure",
    },
    {
      id: 3,
      title: "Simien Mountains",
      type: "destination",
      image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
      location: "Amhara Region",
      rating: 4.8,
      tags: ["Trekking", "Wildlife", "Nature"],
      bestTime: "September - April",
      category: "Adventure",
    },
    {
      id: 4,
      title: "Bale Mountains National Park",
      type: "destination",
      image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
      location: "Oromia Region",
      rating: 4.7,
      tags: ["Wildlife", "Nature", "Endemic Species"],
      bestTime: "October - April",
      category: "Wildlife",
    },
    {
      id: 5,
      title: "Omo Valley",
      type: "destination",
      image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
      location: "Southern Nations",
      rating: 4.6,
      tags: ["Cultural", "Tribal", "Photography"],
      bestTime: "Year-round",
      category: "Cultural",
    },
    {
      id: 6,
      title: "Addis Ababa",
      type: "destination",
      image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
      location: "Addis Ababa",
      rating: 4.5,
      tags: ["Urban", "Museums", "Food"],
      bestTime: "Year-round",
      category: "Cultural",
    },
  ],
  itineraries: [
    {
      id: 1,
      title: "Historical Northern Circuit",
      type: "itinerary",
      image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
      location: "Northern Ethiopia",
      rating: 4.8,
      tags: ["Cultural", "Historical", "7 Days"],
      bestTime: "October - March",
      duration: "7 days",
      category: "Cultural",
    },
    {
      id: 2,
      title: "Ethiopian Highlands Trek",
      type: "itinerary",
      image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
      location: "Central Ethiopia",
      rating: 4.6,
      tags: ["Trekking", "Adventure", "10 Days"],
      bestTime: "September - April",
      duration: "10 days",
      category: "Adventure",
    },
    {
      id: 3,
      title: "Ethiopian Wildlife Safari",
      type: "itinerary",
      image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
      location: "Multiple Regions",
      rating: 4.6,
      tags: ["Wildlife", "Photography", "8 Days"],
      bestTime: "October - March",
      duration: "8 days",
      category: "Wildlife",
    },
    {
      id: 4,
      title: "Ethiopian Coffee Trail",
      type: "itinerary",
      image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
      location: "Multiple Regions",
      rating: 4.8,
      tags: ["Coffee", "Culinary", "Cultural"],
      bestTime: "Year-round",
      duration: "6 days",
      category: "Food",
    },
  ],
  events: [
    {
      id: 1,
      title: "Timkat Festival",
      type: "event",
      image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
      location: "Gondar",
      rating: 4.7,
      tags: ["Cultural", "Religious", "Festival"],
      bestTime: "January",
      date: "January 19, 2025",
      category: "Cultural",
    },
    {
      id: 2,
      title: "Meskel Festival",
      type: "event",
      image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
      location: "Addis Ababa",
      rating: 4.8,
      tags: ["Religious", "Cultural", "Festival"],
      bestTime: "September",
      date: "September 27, 2024",
      category: "Cultural",
    },
  ],
}

export default function AIRecommendationsClient() {
  const [interests, setInterests] = useState<string[]>([])
  const [duration, setDuration] = useState([7])
  const [budget, setBudget] = useState("medium")
  const [travelStyle, setTravelStyle] = useState("balanced")
  const [searchQuery, setSearchQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [hasGenerated, setHasGenerated] = useState(false)

  const handleInterestChange = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest))
    } else {
      setInterests([...interests, interest])
    }
  }

  const generateRecommendations = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      let results: any[] = []

      // Filter based on interests
      if (interests.includes("cultural") || interests.length === 0) {
        results = [
          ...results,
          ...recommendationData.destinations.filter((d) => d.category === "Cultural"),
          ...recommendationData.itineraries.filter((i) => i.category === "Cultural"),
          ...recommendationData.events.filter((e) => e.category === "Cultural"),
        ]
      }

      if (interests.includes("adventure")) {
        results = [
          ...results,
          ...recommendationData.destinations.filter((d) => d.category === "Adventure"),
          ...recommendationData.itineraries.filter((i) => i.category === "Adventure"),
        ]
      }

      if (interests.includes("wildlife")) {
        results = [
          ...results,
          ...recommendationData.destinations.filter((d) => d.category === "Wildlife"),
          ...recommendationData.itineraries.filter((i) => i.category === "Wildlife"),
        ]
      }

      if (interests.includes("food")) {
        results = [...results, ...recommendationData.itineraries.filter((i) => i.category === "Food")]
      }

      // Filter by duration for itineraries
      results = results.map((item) => {
        if (item.type === "itinerary") {
          const itemDuration = Number.parseInt(item.duration.split(" ")[0])
          if (Math.abs(itemDuration - duration[0]) <= 3) {
            return { ...item, relevance: 100 - Math.abs(itemDuration - duration[0]) * 10 }
          } else {
            return { ...item, relevance: 50 }
          }
        }
        return { ...item, relevance: 80 }
      })

      // Sort by relevance
      results.sort((a, b) => b.relevance - a.relevance)

      setRecommendations(results)
      setIsGenerating(false)
      setHasGenerated(true)
    }, 2000)
  }

  const filterRecommendations = () => {
    if (!hasGenerated) return []

    let filtered = [...recommendations]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((item) => item.type === activeTab)
    }

    return filtered
  }

  const filteredRecommendations = filterRecommendations()

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop')",
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
            <span className="text-pink-500 font-medium uppercase tracking-wider">AI-Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Personalized <span className="text-pink-500">Recommendations</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Let our AI create your perfect Ethiopian adventure based on your preferences
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preferences Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden rounded-xl shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Your Travel Preferences</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Interests</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "cultural", label: "Cultural & Historical" },
                        { id: "adventure", label: "Adventure & Nature" },
                        { id: "wildlife", label: "Wildlife & Safari" },
                        { id: "food", label: "Food & Culinary" },
                        { id: "religious", label: "Religious & Spiritual" },
                        { id: "photography", label: "Photography" },
                      ].map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest.id}
                            checked={interests.includes(interest.id)}
                            onCheckedChange={() => handleInterestChange(interest.id)}
                            className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                          />
                          <Label htmlFor={interest.id} className="text-sm cursor-pointer">
                            {interest.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Trip Duration: {duration[0]} days</h3>
                    <Slider value={duration} min={1} max={21} step={1} onValueChange={setDuration} className="py-4" />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>1 day</span>
                      <span>7 days</span>
                      <span>14 days</span>
                      <span>21 days</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Budget</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant={budget === "budget" ? "default" : "outline"}
                        className={budget === "budget" ? "bg-pink-500 hover:bg-pink-600" : ""}
                        onClick={() => setBudget("budget")}
                      >
                        Budget
                      </Button>
                      <Button
                        variant={budget === "medium" ? "default" : "outline"}
                        className={budget === "medium" ? "bg-pink-500 hover:bg-pink-600" : ""}
                        onClick={() => setBudget("medium")}
                      >
                        Medium
                      </Button>
                      <Button
                        variant={budget === "luxury" ? "default" : "outline"}
                        className={budget === "luxury" ? "bg-pink-500 hover:bg-pink-600" : ""}
                        onClick={() => setBudget("luxury")}
                      >
                        Luxury
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Travel Style</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant={travelStyle === "relaxed" ? "default" : "outline"}
                        className={travelStyle === "relaxed" ? "bg-pink-500 hover:bg-pink-600" : ""}
                        onClick={() => setTravelStyle("relaxed")}
                      >
                        Relaxed
                      </Button>
                      <Button
                        variant={travelStyle === "balanced" ? "default" : "outline"}
                        className={travelStyle === "balanced" ? "bg-pink-500 hover:bg-pink-600" : ""}
                        onClick={() => setTravelStyle("balanced")}
                      >
                        Balanced
                      </Button>
                      <Button
                        variant={travelStyle === "active" ? "default" : "outline"}
                        className={travelStyle === "active" ? "bg-pink-500 hover:bg-pink-600" : ""}
                        onClick={() => setTravelStyle("active")}
                      >
                        Active
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={generateRecommendations}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Recommendations...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Recommendations
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {hasGenerated && (
              <Card className="overflow-hidden rounded-xl shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Your Perfect Trip</h3>
                  <p className="text-gray-600 mb-4">
                    Based on your preferences, we recommend a {duration[0]}-day trip focusing on
                    {interests.length > 0 ? interests.map((i) => ` ${i}`).join(", ") : " various experiences"}
                    with a {budget} budget and a {travelStyle} pace.
                  </p>
                  <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
                    <Link href="/itineraries/create">
                      Create Custom Itinerary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommendations Panel */}
          <div className="lg:col-span-2 space-y-6">
            {!hasGenerated ? (
              <div className="bg-pink-50 rounded-xl p-8 text-center h-96 flex flex-col items-center justify-center">
                <Sparkles className="h-12 w-12 text-pink-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Personalized Recommendations</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Select your travel preferences and generate AI-powered recommendations tailored just for you.
                </p>
                <Button
                  className="bg-pink-500 hover:bg-pink-600"
                  onClick={generateRecommendations}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Recommendations
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search recommendations..."
                        className="pl-10 border-pink-100 focus:border-pink-500 focus:ring-pink-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 mr-2 text-pink-500" />
                      <span className="text-gray-700 font-medium mr-2">Filter:</span>
                      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="bg-pink-50">
                          <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                          >
                            All
                          </TabsTrigger>
                          <TabsTrigger
                            value="destination"
                            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                          >
                            Destinations
                          </TabsTrigger>
                          <TabsTrigger
                            value="itinerary"
                            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                          >
                            Itineraries
                          </TabsTrigger>
                          <TabsTrigger
                            value="event"
                            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                          >
                            Events
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </div>

                {filteredRecommendations.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No recommendations found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveTab("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRecommendations.map((item, index) => (
                      <Card
                        key={`${item.type}-${item.id}`}
                        className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index < 4}
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
                          {item.relevance > 90 && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-500 text-white">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Perfect Match
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{item.rating}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>

                          {item.type === "itinerary" && (
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Clock className="h-4 w-4 mr-1 text-pink-500" />
                              <span>{item.duration}</span>
                            </div>
                          )}

                          {item.type === "event" && (
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Calendar className="h-4 w-4 mr-1 text-pink-500" />
                              <span>{item.date}</span>
                            </div>
                          )}

                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar className="h-4 w-4 mr-1 text-pink-500" />
                            <span>Best time: {item.bestTime}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="bg-pink-50 text-pink-500 border-pink-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
                            <Link href={`/${item.type}s/${item.id}`}>
                              {item.type === "destination"
                                ? "Explore"
                                : item.type === "itinerary"
                                  ? "View Itinerary"
                                  : "View Event"}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

