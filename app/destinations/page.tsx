"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Expanded destinations data
const destinations = [
  {
    id: 1,
    name: "Lalibela",
    description: "Famous for its rock-hewn churches, a UNESCO World Heritage site.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nM5ceKYJGgh8WDNREw3_fXo12qWUC7RrdQ&s",
    location: "Amhara Region",
    rating: 4.9,
    category: "Historical",
    featured: true,
  },
  {
    id: 2,
    name: "Danakil Depression",
    description: "One of the hottest places on Earth with colorful sulfur springs and salt formations.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/9f/c2/a6/amazing-chemical-pools.jpg?w=1200&h=-1&s=1",
    location: "Afar Region",
    rating: 4.7,
    category: "Natural Wonder",
    featured: true,
  },
  {
    id: 3,
    name: "Simien Mountains",
    description: "Breathtaking mountain range with unique wildlife and stunning views.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQUOPiaenA51A3OqdfSy2-JGq92A-7lfSQTw&s",
    location: "Amhara Region",
    rating: 4.8,
    category: "National Park",
    featured: true,
  },
  {
    id: 4,
    name: "Axum",
    description: "Ancient city with obelisks and archaeological sites from the Kingdom of Axum.",
    image: "https://cdn.britannica.com/23/93423-050-107B2836/obelisk-kingdom-Aksum-Ethiopian-name-city.jpg",
    location: "Tigray Region",
    rating: 4.6,
    category: "Historical",
    featured: false,
  },
  {
    id: 5,
    name: "Omo Valley",
    description: "Home to diverse indigenous tribes with unique cultures and traditions.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ab7OljkNSnAgUMwUdfZx9fYxJ7TkQCOMEQ&s",
    location: "Southern Nations",
    rating: 4.7,
    category: "Cultural",
    featured: false,
  },
  {
    id: 6,
    name: "Blue Nile Falls",
    description: "Spectacular waterfall known locally as Tis Abay or 'smoking water'.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmE07ZJPBrqaxV2sHhPZ-dpC9ofta-O6QPBQ&s",
    location: "Amhara Region",
    rating: 4.5,
    category: "Natural Wonder",
    featured: false,
  },
  {
    id: 7,
    name: "Gondar",
    description: "Known for its medieval castles and the Royal Enclosure, a UNESCO World Heritage site.",
    image: "https://www.exoticca.com/_next/image?url=https%3A%2F%2Fuploads.exoticca.com%2Fglobal%2Fdestination%2Fpoi%2Fgondar.png&w=3840&q=75",
    location: "Amhara Region",
    rating: 4.6,
    category: "Historical",
    featured: false,
  },
  {
    id: 8,
    name: "Bale Mountains",
    description: "National park with diverse wildlife including the Ethiopian Wolf and Nyala.",
    image: "https://imgix.brilliant-ethiopia.com/Bale-Mountain-3.png?auto=format,enhance,compress&fit=crop&crop=entropy,faces,focalpoint&w=1880&h=740&q=30",
    location: "Oromia Region",
    rating: 4.7,
    category: "National Park",
    featured: false,
  },
  {
    id: 9,
    name: "Harar",
    description: "Ancient walled city known for its distinctive culture and architecture.",
    image: "https://www.ameco.et/english/wp-content/uploads/2023/07/received_310733391293938.jpeg",
    location: "Harari Region",
    rating: 4.5,
    category: "Cultural",
    featured: false,
  },
]

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [activeTab, setActiveTab] = useState("all")

  // Filter destinations based on search query and filters
  useEffect(() => {
    let result = destinations

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (destination) =>
          destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((destination) => destination.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Apply region filter
    if (regionFilter !== "all") {
      result = result.filter((destination) => destination.location.toLowerCase().includes(regionFilter.toLowerCase()))
    }

    // Apply tab filter
    if (activeTab === "featured") {
      result = result.filter((destination) => destination.featured)
    }

    setFilteredDestinations(result)
  }, [searchQuery, categoryFilter, regionFilter, activeTab])

  return (
    <div>
      {/* Hero Section with Overlapping Images */}
      <div className="relative h-[50vh] w-full overflow-hidden">
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

        {/* Decorative Elements */}
        <div className="absolute right-10 top-1/4 h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 md:h-48 md:w-48 lg:right-20">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKKtcico3lO_-yGaj6q2jwezFfY_zPp3EJbg&s"
            alt="Ethiopian Culture"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-10 right-20 h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 md:h-32 md:w-32">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIRTmfSI1IPXOiquanl1E0Kdyyn8XFWpa6w&s"
            alt="Ethiopian Landscape"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore <span className="text-[#E61C5D]">Ethiopia's</span>{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Destinations</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full -z-0"></span>
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            From ancient <span className="text-yellow-400">historical sites</span> to breathtaking{" "}
            <span className="text-[#E61C5D]">natural wonders</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E61C5D] h-5 w-5" />
              <Input
                type="text"
                placeholder="Search destinations..."
                className="pl-10 border-pink-100 focus:border-pink-500 focus:ring-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="border-pink-100 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="historical">Historical</SelectItem>
                <SelectItem value="natural wonder">Natural Wonder</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="national park">National Park</SelectItem>
              </SelectContent>
            </Select>

            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="border-pink-100 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="amhara">Amhara Region</SelectItem>
                <SelectItem value="afar">Afar Region</SelectItem>
                <SelectItem value="tigray">Tigray Region</SelectItem>
                <SelectItem value="southern">Southern Nations</SelectItem>
                <SelectItem value="oromia">Oromia Region</SelectItem>
                <SelectItem value="harari">Harari Region</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-[#E61C5D]" />
              <span className="text-gray-700 font-medium">Active Filters:</span>
              {categoryFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-[#E61C5D] hover:bg-pink-200"
                  onClick={() => setCategoryFilter("all")}
                >
                  {categoryFilter} ×
                </Badge>
              )}
              {regionFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-[#E61C5D] hover:bg-pink-200"
                  onClick={() => setRegionFilter("all")}
                >
                  {regionFilter} ×
                </Badge>
              )}
              {(categoryFilter !== "all" || regionFilter !== "all" || searchQuery) && (
                <Button
                  variant="link"
                  className="ml-2 text-[#E61C5D] p-0 h-auto rounded-xl"
                  onClick={() => {
                    setCategoryFilter("all")
                    setRegionFilter("all")
                    setSearchQuery("")
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="text-gray-600">
              Showing {filteredDestinations.length} of {destinations.length} destinations
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-pink-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
              All Destinations
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
              Featured
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-[#E61C5D] text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setCategoryFilter("all")
                setRegionFilter("all")
                setSearchQuery("")
              }}
              className="bg-[#E61C5D] hover:bg-pink-700 rounded-full rounded-xl"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#E61C5D] text-sm font-medium py-1 px-3 rounded-full flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {destination.rating}
                  </div>
                  {destination.featured && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium py-1 px-3 rounded-full">
                    {destination.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-[#E61C5D]" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <Button asChild className="w-full bg-[#E61C5D] hover:bg-pink-600 rounded-full">
                    <Link href={`/destinations/${destination.id}`}>Explore</Link>
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

