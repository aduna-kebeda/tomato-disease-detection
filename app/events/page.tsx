"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, ArrowRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    id: 1,
    title: "Irreecha Festival",
    description: "Join the Oromo people's thanksgiving celebration at Lake Hora.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqpaxC6ACLN-LDt1KBTgH-AQEFO7ADHFcjtw&s",
    date: "October 5, 2024",
    time: "Morning to evening",
    location: "Bishoftu",
    category: "Cultural",
    featured: true,
    
  },
  {
    id: 2,
    title: "Great Ethiopian Run",
    description: "Join Africa's biggest road race through the streets of Addis Ababa.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDHFdIYzbmygcPAAdjlMBDNYmaXxaJ7dEbw&s",
    date: "November 15, 2024",
    time: "8:00 AM - 12:00 PM",
    location: "Addis Ababa",
    category: "Sports",
    featured: false,
  },
  {
    id: 3,
    title: "Meskel Festival",
    description: "Witness the Finding of the True Cross celebration with bonfires and ceremonies.",
    image: "https://fanosethiopiatours.wordpress.com/wp-content/uploads/2014/09/demerat-at-mesqule-square.jpg?w=792&h=403",
    date: "September 27, 2024",
    time: "4:00 PM - 9:00 PM",
    location: "Addis Ababa",
    category: "Religious",
    featured: true,
  },
  {
    id: 4,
    title: "Ethiopian New Year (Enkutatash)",
    description: "Celebrate the Ethiopian New Year with traditional music, dance, and feasting.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQqMNAKK9AqTjpEDXFuv9XbJcCs4U_Zr5lUA&s",
    date: "September 11, 2024",
    time: "All day",
    location: "Nationwide",
    category: "Cultural",
    featured: true,
  },
  {
    id: 5,
    title: "Kulubi Gabriel Celebration",
    description: "Join thousands of pilgrims at the Kulubi Gabriel Church for this religious festival.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3E9_QfKWg_FedoamCACw9ZG2dgIQ0o3tjg&s",
    date: "December 28, 2024",
    time: "All day",
    location: "Kulubi, Eastern Ethiopia",
    category: "Religious",
    featured: false,
  },
  {
    id: 6,
    title: "Ashenda",
    description: "Experience this girls' festival celebrated in the Tigray and Amhara regions.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9q1N8BQh8xZ3ZXLYT071elrszV1gCwuGYzw&s",
    date: "August 22, 2024",
    time: "All day",
    location: "Tigray and Amhara Regions",
    category: "Cultural",
    featured: false,
  },
  {
    id: 7,
    title: "Ethiopian Film Festival",
    description: "Watch the best of Ethiopian cinema at this annual film festival.",
    image: "https://lh4.googleusercontent.com/proxy/5ArUnphcQguXO20KSKh4oGJvdduW2JgtV7kwH8T1mI3xe-WudGMD1cqumzm_vf28XGCo5Vv5Nu4C5AKfrl6luKsdp68yzljFKI-LkKahmc96OtGxgg",
    date: "November 5-12, 2024",
    time: "Various times",
    location: "Addis Ababa",
    category: "Arts",
    featured: false,
  },
  {
    id: 8,
    title: "Timkat Festival",
    description: "Experience Ethiopia's colorful Epiphany celebration with processions and ceremonies.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv9uhYAiKbH3RI5-zn0E4hqfv3ll6NVrA83A&s",
    date: "January 19, 2025",
    time: "All day",
    location: "Gondar",
    category: "Religious",
    featured: true,
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [activeTab, setActiveTab] = useState("all")

  // Filter events based on search query and filters
  useEffect(() => {
    let result = events

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((event) => event.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Apply month filter
    if (monthFilter !== "all") {
      const monthMap: { [key: string]: string } = {
        jan: "January",
        feb: "February",
        mar: "March",
        apr: "April",
        may: "May",
        jun: "June",
        jul: "July",
        aug: "August",
        sep: "September",
        oct: "October",
        nov: "November",
        dec: "December",
      }

      result = result.filter((event) => event.date.includes(monthMap[monthFilter]))
    }

    // Apply tab filter
    if (activeTab === "featured") {
      result = result.filter((event) => event.featured)
    } else if (activeTab === "upcoming") {
      // For demo purposes, consider all events as upcoming
      // In a real app, you would compare with the current date
    }

    setFilteredEvents(result)
  }, [searchQuery, categoryFilter, monthFilter, activeTab])

  return (
    <div>
      {/* Hero Section with Overlapping Images */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuO6DWk3w-u8Vl9LUaIl_2iOEJIrtLE3Rpg&s')",
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-10 top-1/4 h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 md:h-48 md:w-48 lg:right-20">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjEs4K8t9BQ6rtjk3KutPQkyl3QjL4ETiaQ&s"
            alt="Ethiopian Festival"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-10 right-20 h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 md:h-32 md:w-32">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeK87GiK-d652wR6_8ZipLQCwIU_KB8IGjOQ&s"
            alt="Ethiopian Landscape"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-pink-500">Events</span> &{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Festivals</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full -z-0"></span>
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Experience Ethiopia's vibrant <span className="text-yellow-400">cultural celebrations</span> and unique
            traditions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Upcoming <span className="text-pink-500">Events</span>
            </h2>
            <p className="text-gray-600">
              Discover Ethiopia's vibrant cultural events, religious ceremonies, and festivals
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events..."
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
                <SelectItem value="religious">Religious</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger className="border-pink-100 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="jan">January</SelectItem>
                <SelectItem value="feb">February</SelectItem>
                <SelectItem value="mar">March</SelectItem>
                <SelectItem value="apr">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="jun">June</SelectItem>
                <SelectItem value="jul">July</SelectItem>
                <SelectItem value="aug">August</SelectItem>
                <SelectItem value="sep">September</SelectItem>
                <SelectItem value="oct">October</SelectItem>
                <SelectItem value="nov">November</SelectItem>
                <SelectItem value="dec">December</SelectItem>
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
              {monthFilter !== "all" && (
                <Badge
                  className="ml-2 bg-pink-100 text-pink-500 hover:bg-pink-200"
                  onClick={() => setMonthFilter("all")}
                >
                  {monthFilter} ×
                </Badge>
              )}
              {(categoryFilter !== "all" || monthFilter !== "all" || searchQuery) && (
                <Button
                  variant="link"
                  className="ml-2 text-pink-500 p-0 h-auto"
                  onClick={() => {
                    setCategoryFilter("all")
                    setMonthFilter("all")
                    setSearchQuery("")
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-pink-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              All Events
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Featured
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Upcoming
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-pink-500 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setCategoryFilter("all")
                setMonthFilter("all")
                setSearchQuery("")
              }}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {event.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-pink-500 border-0">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-pink-500">{event.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-50">
                    <Link href={`/events/${event.id}`}>
                      Event Details
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

