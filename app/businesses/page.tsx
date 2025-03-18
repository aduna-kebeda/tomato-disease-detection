"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Phone, Globe, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const businesses = [
  {
    id: 1,
    name: "Sheraton Addis",
    description: "Luxury hotel in the heart of Addis Ababa with multiple restaurants and a spa.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSukVkono92rn6HVP9RjR3p4lLg8BXh3G9tRg&s",
    location: "Addis Ababa",
    category: "Hotel",
    rating: 4.8,
    priceRange: "$$$",
    phone: "+251 11 517 1717",
    website: "www.sheratonaddis.com",
    featured: true,
  },
  {
    id: 2,
    name: "Yod Abyssinia Cultural Restaurant",
    description: "Traditional Ethiopian restaurant with cultural performances and authentic cuisine.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU39muI2AfHy-KiO_W4SPyGRqPfskrWQfNmQ&s",
    location: "Addis Ababa",
    category: "Restaurant",
    rating: 4.6,
    priceRange: "$$",
    phone: "+251 11 661 2985",
    website: "www.yodethiopia.com",
    featured: true,
  },
  {
    id: 3,
    name: "Ethiopia Travel Agency",
    description: "Full-service tour operator specializing in cultural and historical tours of Ethiopia.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNW3-2QXVV9bWGUsuIOW1xWLpstY3t1uCp3w&s",
    location: "Addis Ababa",
    category: "Tour Operator",
    rating: 4.9,
    priceRange: "$$",
    phone: "+251 11 123 4567",
    website: "www.ethiopiatravelagency.com",
    featured: false,
  },
  {
    id: 4,
    name: "Mountain View Hotel",
    description: "Comfortable hotel with panoramic views of the mountains in Wonchi.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-e58FVvl0CxJJm2aiFaaZYJGB2mHu8bH0w&s",
    location: "Wonchi",
    category: "Hotel",
    rating: 4.5,
    priceRange: "$$",
    phone: "+251 33 336 0804",
    website: "www.mountainviewhotel.com",
    featured: false,
  },
  {
    id: 5,
    name: "Ben Abeba Restaurant",
    description: "Unique restaurant with stunning architecture and views over Lalibela.",
    image: "https://imgix.brilliant-ethiopia.com/ben-abeba-restaurant-3.jpg?auto=format,enhance,compress&fit=crop&crop=entropy,faces,focalpoint&w=580&h=480&q=40",
    location: "Lalibela",
    category: "Restaurant",
    rating: 4.7,
    priceRange: "$$",
    phone: "+251 93 180 2453",
    website: "www.benabeba.com",
    featured: true,
  },
  {
    id: 6,
    name: "Simien Lodge",
    description: "Highest lodge in Africa located in the Simien Mountains National Park.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UbDQ4Spa9afeD5-zWmw2aegRFsQFmSTOng&s",
    location: "Simien Mountains",
    category: "Hotel",
    rating: 4.6,
    priceRange: "$$$",
    phone: "+251 91 122 6954",
    website: "www.simienlodge.com",
    featured: false,
  },
  {
    id: 7,
    name: "Ethio Travel and Tours",
    description: "Experienced tour operator offering customized tours throughout Ethiopia.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQBdoaMQXcrcJ7Pa8MkUCYC-zjlwmDmj3i4w&s",
    location: "Addis Ababa",
    category: "Tour Operator",
    rating: 4.8,
    priceRange: "$$",
    phone: "+251 11 551 7666",
    website: "www.ethiotravelandtours.com",
    featured: false,
  },
  {
    id: 8,
    name: "Kuriftu Resort & Spa",
    description: "Luxury resort with spa facilities located in oromia.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27N9RFFLm7z0aPfS3zuCIkIuO9U7BZDWDdg&s",
    location: "Bishoftu",
    category: "Hotel",
    rating: 4.7,
    priceRange: "$$$",
    phone: "+251 58 220 0259",
    website: "www.kurifturesort.com",
    featured: false,
  },
]

export default function BusinessesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses)
  const [activeTab, setActiveTab] = useState("all")

  // Filter businesses based on search query and filters
  useEffect(() => {
    let result = businesses

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (business) =>
          business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((business) => business.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Apply location filter
    if (locationFilter !== "all") {
      result = result.filter((business) => business.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    // Apply tab filter
    if (activeTab === "featured") {
      result = result.filter((business) => business.featured)
    }

    setFilteredBusinesses(result)
  }, [searchQuery, categoryFilter, locationFilter, activeTab])

  return (
    <div>
      {/* Hero Section with Overlapping Images */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop')",
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-10 top-1/4 h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 md:h-48 md:w-48 lg:right-20">
          <Image
            src="https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop"
            alt="Ethiopian Business"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-10 right-20 h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 md:h-32 md:w-32">
          <Image
            src="https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop"
            alt="Ethiopian Landscape"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-pink-500">Business</span>{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Directory</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full -z-0"></span>
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Find the best <span className="text-yellow-400">hotels</span>,{" "}
            <span className="text-pink-500">restaurants</span>, and tour operators in Ethiopia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Local <span className="text-pink-500">Businesses</span>
            </h2>
            <p className="text-gray-600">Discover trusted businesses to enhance your Ethiopian experience</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search businesses..."
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
                <SelectItem value="hotel">Hotels</SelectItem>
                <SelectItem value="restaurant">Restaurants</SelectItem>
                <SelectItem value="tour operator">Tour Operators</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="border-pink-100 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="addis">Addis Ababa</SelectItem>
                <SelectItem value="lalibela">Lalibela</SelectItem>
                <SelectItem value="gondar">Gondar</SelectItem>
                <SelectItem value="axum">Axum</SelectItem>
                <SelectItem value="bahir">Bahir Dar</SelectItem>
                <SelectItem value="simien">Simien Mountains</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-pink-500" />
              <span className="text-gray-700 font-medium">Active Filters:</span>
              {categoryFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-pink-500 hover:bg-pink-200"
                  onClick={() => setCategoryFilter("all")}
                >
                  {categoryFilter} ×
                </Badge>
              )}
              {locationFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-pink-500 hover:bg-pink-200"
                  onClick={() => setLocationFilter("all")}
                >
                  {locationFilter} ×
                </Badge>
              )}
              {(categoryFilter !== "all" || locationFilter !== "all" || searchQuery) && (
                <Button
                  variant="link"
                  className="ml-2 text-pink-500 p-0 h-auto"
                  onClick={() => {
                    setCategoryFilter("all")
                    setLocationFilter("all")
                    setSearchQuery("")
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="text-gray-600">
              Showing {filteredBusinesses.length} of {businesses.length} businesses
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-pink-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              All Businesses
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Featured
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Businesses Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-pink-500 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setCategoryFilter("all")
                setLocationFilter("all")
                setSearchQuery("")
              }}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => (
              <Card
                key={business.id}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={business.image || "/placeholder.svg"}
                    alt={business.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-black/60 text-white border-white/30">
                      {business.priceRange}
                    </Badge>
                  </div>
                  {business.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-pink-500 text-white">Featured</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="bg-pink-50 text-pink-500">
                      {business.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{business.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{business.name}</h3>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                    <span>{business.location}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{business.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{business.website}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
                    <Link href={`/businesses/${business.id}`}>View Details</Link>
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

