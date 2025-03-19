"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, Calendar, ArrowRight, Plus, Search, Filter, Edit, Trash2, Share2, MapPin, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample data for user itineraries
const userItineraries = [
  {
    id: 1,
    title: "My Northern Ethiopia Adventure",
    description: "A 10-day journey through the historical sites of Northern Ethiopia",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
    duration: "10 days",
    startDate: "2024-11-15",
    endDate: "2024-11-25",
    status: "upcoming",
    locations: ["Lalibela", "Axum", "Gondar"],
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Danakil Depression Expedition",
    description: "Exploring one of the hottest places on Earth",
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
    duration: "5 days",
    startDate: "2025-01-10",
    endDate: "2025-01-15",
    status: "upcoming",
    locations: ["Danakil Depression", "Erta Ale"],
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Addis Ababa City Break",
    description: "A weekend exploring Ethiopia's vibrant capital",
    image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
    duration: "3 days",
    startDate: "2023-12-10",
    endDate: "2023-12-13",
    status: "completed",
    locations: ["Addis Ababa"],
    lastUpdated: "3 months ago",
  },
  {
    id: 4,
    title: "Omo Valley Cultural Tour",
    description: "Visiting indigenous tribes in the Omo Valley",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
    duration: "7 days",
    startDate: "2023-10-05",
    endDate: "2023-10-12",
    status: "completed",
    locations: ["Omo Valley", "Turmi", "Jinka"],
    lastUpdated: "5 months ago",
  },
  {
    id: 5,
    title: "Ethiopian Coffee Trail",
    description: "Draft itinerary for exploring Ethiopia's coffee regions",
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
    duration: "8 days",
    startDate: "",
    endDate: "",
    status: "draft",
    locations: ["Addis Ababa", "Jimma", "Yirgacheffe"],
    lastUpdated: "2 weeks ago",
  },
]

export default function MyItinerariesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [itineraries, setItineraries] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Simulate API call to fetch user itineraries
    const fetchItineraries = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setItineraries(userItineraries)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load your itineraries",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchItineraries()
  }, [router, toast])

  const handleDeleteItinerary = (id: number) => {
    setItineraries(itineraries.filter((itinerary) => itinerary.id !== id))
    toast({
      title: "Itinerary deleted",
      description: "Your itinerary has been deleted successfully",
    })
  }

  const filteredItineraries = itineraries.filter((itinerary) => {
    // Apply search filter
    const matchesSearch =
      itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itinerary.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itinerary.locations.some((location: string) => location.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply status filter
    const matchesStatus = statusFilter === "all" || itinerary.status === statusFilter

    // Apply tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && itinerary.status === "upcoming") ||
      (activeTab === "completed" && itinerary.status === "completed") ||
      (activeTab === "drafts" && itinerary.status === "draft")

    return matchesSearch && matchesStatus && matchesTab
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#E61C5D]" />
          <p className="text-lg font-medium">Loading your itineraries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Itineraries</h1>
          <p className="text-muted-foreground">Manage and view your saved travel plans</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#E61C5D] hover:bg-pink-700 rounded-full" asChild>
          <Link href="/itineraries/create">
            <Plus className="h-4 w-4 mr-2" />
            Create New Itinerary
          </Link>
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E61C5D] h-5 w-5" />
            <Input
              type="text"
              placeholder="Search your itineraries..."
              className="pl-10 border-pink-100 focus:border-pink-500 focus:ring-pink-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-[#E61C5D]" />
            <span className="text-gray-700 font-medium mr-2">Status:</span>
            <div className="flex space-x-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                className={statusFilter === "all" ? "bg-[#E61C5D] hover:bg-pink-700 rounded-full" : ""}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "upcoming" ? "default" : "outline"}
                size="sm"
                className={statusFilter === "upcoming" ? "bg-[#E61C5D] hover:bg-pink-700 rounded-full" : ""}
                onClick={() => setStatusFilter("upcoming")}
              >
                Upcoming
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                className={statusFilter === "completed" ? "bg-[#E61C5D] hover:bg-pink-700 rounded-full" : ""}
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "draft" ? "default" : "outline"}
                size="sm"
                className={statusFilter === "draft" ? "bg-[#E61C5D] hover:bg-pink-700 rounded-full" : ""}
                onClick={() => setStatusFilter("draft")}
              >
                Drafts
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="bg-pink-50">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
            All Itineraries
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
            Completed
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredItineraries.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-xl font-bold mb-2">No itineraries found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search criteria" : "You haven't created any itineraries yet"}
              </p>
              <Button asChild className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                <Link href="/itineraries/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Itinerary
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map((itinerary) => (
                <Card
                  key={itinerary.id}
                  className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={itinerary.image || "/placeholder.svg"}
                      alt={itinerary.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`
                        ${
                          itinerary.status === "upcoming"
                            ? "bg-green-500"
                            : itinerary.status === "completed"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                        } text-white
                      `}
                      >
                        {itinerary.status === "upcoming"
                          ? "Upcoming"
                          : itinerary.status === "completed"
                            ? "Completed"
                            : "Draft"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{itinerary.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{itinerary.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-[#E61C5D]" />
                        <span>{itinerary.duration}</span>
                      </div>
                      {itinerary.startDate && (
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-[#E61C5D]" />
                          <span>
                            {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                            {new Date(itinerary.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-[#E61C5D]" />
                        <span>{itinerary.locations.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mb-4">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/itineraries/${itinerary.id}/edit`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteItinerary(itinerary.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button asChild className="w-full bg-[#E61C5D] hover:bg-pink-700 rounded-full">
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
        </TabsContent>

        {/* Similar content for other tabs, using the filtered data */}
        <TabsContent value="upcoming" className="mt-6">
          {filteredItineraries.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-xl font-bold mb-2">No upcoming itineraries</h3>
              <p className="text-muted-foreground mb-6">You don't have any upcoming trips planned</p>
              <Button asChild className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                <Link href="/itineraries/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Plan Your Next Trip
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Same card structure as above */}
              {filteredItineraries.map((itinerary) => (
                <Card
                  key={itinerary.id}
                  className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  {/* Same card content as above */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={itinerary.image || "/placeholder.svg"}
                      alt={itinerary.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">Upcoming</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{itinerary.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{itinerary.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-[#E61C5D]" />
                        <span>{itinerary.duration}</span>
                      </div>
                      {itinerary.startDate && (
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-[#E61C5D]" />
                          <span>
                            {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                            {new Date(itinerary.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-[#E61C5D]" />
                        <span>{itinerary.locations.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mb-4">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/itineraries/${itinerary.id}/edit`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteItinerary(itinerary.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button asChild className="w-full bg-[#E61C5D] hover:bg-pink-700 rounded-full">
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
        </TabsContent>

        {/* Similar structure for completed and drafts tabs */}
      </Tabs>
    </div>
  )
}

