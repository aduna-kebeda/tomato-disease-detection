"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, Users, ArrowRight, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const itineraries = [
  {
    id: 1,
    title: "Historical Northern Circuit",
    description: "Explore the ancient historical sites of Northern Ethiopia including Lalibela, Axum, and Gondar.",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
    duration: "7 days",
    bestSeason: "October - March",
    groupSize: "2-12 people",
    tags: ["Historical", "Cultural", "UNESCO"],
    featured: true,
  },
  {
    id: 2,
    title: "Omo Valley Cultural Experience",
    description: "Immerse yourself in the diverse cultures of Ethiopia's Omo Valley tribes.",
    image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
    duration: "10 days",
    bestSeason: "Year-round",
    groupSize: "4-8 people",
    tags: ["Cultural", "Photography", "Tribal"],
    featured: false,
  },
  {
    id: 3,
    title: "Ethiopian Highlands Trek",
    description: "Trek through the breathtaking landscapes of the Simien Mountains and Bale Mountains National Parks.",
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
    duration: "12 days",
    bestSeason: "September - April",
    groupSize: "2-10 people",
    tags: ["Adventure", "Trekking", "Wildlife"],
    featured: true,
  },
  {
    id: 4,
    title: "Danakil Depression Expedition",
    description: "Venture into one of the hottest and most geologically active places on Earth.",
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
    duration: "5 days",
    bestSeason: "November - February",
    groupSize: "4-12 people",
    tags: ["Adventure", "Geological", "Extreme"],
    featured: false,
  },
  {
    id: 5,
    title: "Ethiopian Coffee Trail",
    description: "Follow the journey of Ethiopian coffee from farm to cup across the country's coffee regions.",
    image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
    duration: "8 days",
    bestSeason: "Year-round",
    groupSize: "2-8 people",
    tags: ["Culinary", "Cultural", "Rural"],
    featured: false,
  },
  {
    id: 6,
    title: "Addis Ababa City Break",
    description: "Explore Ethiopia's vibrant capital city, its museums, markets, and culinary scene.",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
    duration: "3 days",
    bestSeason: "Year-round",
    groupSize: "Any",
    tags: ["Urban", "Cultural", "Museums"],
    featured: false,
  },
  {
    id: 7,
    title: "Ethiopian Wildlife Safari",
    description: "Discover Ethiopia's unique wildlife in national parks and sanctuaries across the country.",
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
    duration: "9 days",
    bestSeason: "October - April",
    groupSize: "2-8 people",
    tags: ["Wildlife", "Nature", "Photography"],
    featured: true,
  },
  {
    id: 8,
    title: "Ethiopian Festivals Tour",
    description: "Experience Ethiopia's vibrant religious and cultural festivals throughout the year.",
    image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
    duration: "Varies",
    bestSeason: "Depends on festival",
    groupSize: "2-10 people",
    tags: ["Cultural", "Religious", "Festivals"],
    featured: false,
  },
]

export default function ItinerariesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [durationFilter, setDurationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [filteredItineraries, setFilteredItineraries] = useState(itineraries)
  const [activeTab, setActiveTab] = useState("all")

  // Filter itineraries based on search query and filters
  useEffect(() => {
    let result = itineraries

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (itinerary) =>
          itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          itinerary.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          itinerary.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply duration filter
    if (durationFilter !== "all") {
      result = result.filter((itinerary) => {
        const days = Number.parseInt(itinerary.duration.split(" ")[0])
        if (durationFilter === "short") return days <= 3
        if (durationFilter === "medium") return days > 3 && days <= 7
        if (durationFilter === "long") return days > 7
        return true
      })
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((itinerary) =>
        itinerary.tags.some((tag) => tag.toLowerCase() === typeFilter.toLowerCase()),
      )
    }

    // Apply tab filter
    if (activeTab === "featured") {
      result = result.filter((itinerary) => itinerary.featured)
    }

    setFilteredItineraries(result)
  }, [searchQuery, durationFilter, typeFilter, activeTab])

  return (
    <div>
      {/* Hero Section with Overlapping Images */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop')",
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-10 top-1/4 h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 md:h-48 md:w-48 lg:right-20">
          <Image
            src="https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop"
            alt="Lalibela Church"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-10 right-20 h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 md:h-32 md:w-32">
          <Image
            src="https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop"
            alt="Ethiopian Coffee Ceremony"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-pink-500">Plan</span> Your Perfect{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Journey</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full -z-0"></span>
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover our carefully crafted <span className="text-yellow-400">travel itineraries</span> to experience the
            best of Ethiopia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Travel <span className="text-pink-500">Itineraries</span>
            </h2>
            <p className="text-gray-600">Explore our curated collection of Ethiopian adventures</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-pink-500 hover:bg-pink-600" asChild>
            <Link href="/itineraries/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Itinerary
            </Link>
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search itineraries..."
                className="pl-10 border-pink-100 focus:border-pink-500 focus:ring-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="border-pink-100 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">Short (1-3 days)</SelectItem>
                <SelectItem value="medium">Medium (4-7 days)</SelectItem>
                <SelectItem value="long">Long (8+ days)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border-pink-100 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="historical">Historical</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="wildlife">Wildlife</SelectItem>
                <SelectItem value="trekking">Trekking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-pink-500" />
              <span className="text-gray-700 font-medium">Active Filters:</span>
              {durationFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-pink-500 hover:bg-pink-200"
                  onClick={() => setDurationFilter("all")}
                >
                  {durationFilter} ×
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-pink-500 hover:bg-pink-200"
                  onClick={() => setTypeFilter("all")}
                >
                  {typeFilter} ×
                </Badge>
              )}
              {(durationFilter !== "all" || typeFilter !== "all" || searchQuery) && (
                <Button
                  variant="link"
                  className="ml-2 text-pink-500 p-0 h-auto"
                  onClick={() => {
                    setDurationFilter("all")
                    setTypeFilter("all")
                    setSearchQuery("")
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="text-gray-600">
              Showing {filteredItineraries.length} of {itineraries.length} itineraries
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-pink-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              All Itineraries
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Featured
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Featured Itineraries */}
        {activeTab === "featured" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Featured <span className="text-pink-500">Itineraries</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItineraries
                .filter((itinerary) => itinerary.featured)
                .map((itinerary) => (
                  <Card
                    key={itinerary.id}
                    className="overflow-hidden h-full flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={itinerary.image || "/placeholder.svg"}
                        alt={itinerary.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-pink-500 text-white">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold mb-2">{itinerary.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{itinerary.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-pink-500" />
                          <span>{itinerary.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                          <span>Best: {itinerary.bestSeason}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-pink-500" />
                          <span>{itinerary.groupSize}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {itinerary.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-pink-50 text-pink-500">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button asChild className="w-full mt-auto bg-pink-500 hover:bg-pink-600">
                        <Link href={`/itineraries/${itinerary.id}`}>
                          View Itinerary
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Itineraries */}
        {filteredItineraries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-pink-500 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No itineraries found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setDurationFilter("all")
                setTypeFilter("all")
                setSearchQuery("")
              }}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItineraries.map((itinerary) => (
              <Card
                key={itinerary.id}
                className="overflow-hidden h-full flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={itinerary.image || "/placeholder.svg"}
                    alt={itinerary.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {itinerary.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-pink-500 text-white">Featured</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">{itinerary.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{itinerary.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{itinerary.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Best: {itinerary.bestSeason}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{itinerary.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {itinerary.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-pink-50 text-pink-500">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full mt-auto bg-pink-500 hover:bg-pink-600">
                    <Link href={`/itineraries/${itinerary.id}`}>
                      View Itinerary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

