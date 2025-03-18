"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Users, MapPin, Plus, Trash2, Save, Share2, ArrowLeft, Loader2, Search } from "lucide-react"

// Mock data for destinations
const popularDestinations = [
  {
    id: 1,
    name: "Lalibela",
    type: "Historical",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Danakil Depression",
    type: "Natural Wonder",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Addis Ababa",
    type: "City",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Simien Mountains",
    type: "National Park",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Axum",
    type: "Historical",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Gondar",
    type: "Historical",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
  },
]

export default function CreateItineraryClientPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [itineraryData, setItineraryData] = useState({
    title: "",
    description: "",
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    destinations: [] as { id: number; name: string; type: string; image: string; notes: string }[],
    groupSize: "2",
    budget: "medium",
    isPublic: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setItineraryData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateRangeChange = (dateRange: { from: Date; to: Date }) => {
    setItineraryData((prev) => ({ ...prev, dateRange }))
  }

  const addDestination = (destination: { id: number; name: string; type: string; image: string }) => {
    if (itineraryData.destinations.some((d) => d.id === destination.id)) {
      toast({
        title: "Destination already added",
        description: `${destination.name} is already in your itinerary.`,
        variant: "destructive",
      })
      return
    }

    setItineraryData((prev) => ({
      ...prev,
      destinations: [...prev.destinations, { ...destination, notes: "" }],
    }))

    toast({
      title: "Destination added",
      description: `${destination.name} has been added to your itinerary.`,
    })
  }

  const removeDestination = (id: number) => {
    setItineraryData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d.id !== id),
    }))
  }

  const updateDestinationNotes = (id: number, notes: string) => {
    setItineraryData((prev) => ({
      ...prev,
      destinations: prev.destinations.map((d) => (d.id === id ? { ...d, notes } : d)),
    }))
  }

  const handleSaveItinerary = () => {
    if (!itineraryData.title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your itinerary.",
        variant: "destructive",
      })
      return
    }

    if (itineraryData.destinations.length === 0) {
      toast({
        title: "No destinations",
        description: "Please add at least one destination to your itinerary.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Itinerary saved",
        description: "Your itinerary has been saved successfully.",
      })
      setIsLoading(false)
      router.push("/itineraries")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Create New Itinerary</h1>
        <p className="text-muted-foreground">Plan your perfect Ethiopian adventure</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Itinerary Details</CardTitle>
              <CardDescription>Provide basic information about your trip</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Itinerary Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Ethiopian Historical Tour"
                  value={itineraryData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your trip plans and highlights..."
                  rows={4}
                  value={itineraryData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Travel Dates</Label>
                  <DatePickerWithRange date={itineraryData.dateRange} onDateChange={handleDateRangeChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupSize">Group Size</Label>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="groupSize"
                      name="groupSize"
                      type="number"
                      min="1"
                      value={itineraryData.groupSize}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget Range</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={itineraryData.budget === "budget" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setItineraryData((prev) => ({ ...prev, budget: "budget" }))}
                  >
                    Budget
                  </Button>
                  <Button
                    variant={itineraryData.budget === "medium" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setItineraryData((prev) => ({ ...prev, budget: "medium" }))}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={itineraryData.budget === "luxury" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setItineraryData((prev) => ({ ...prev, budget: "luxury" }))}
                  >
                    Luxury
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={itineraryData.isPublic}
                  onChange={(e) => setItineraryData((prev) => ({ ...prev, isPublic: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isPublic" className="text-sm font-normal">
                  Make this itinerary public and shareable
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Destinations</CardTitle>
              <CardDescription>Destinations included in your itinerary</CardDescription>
            </CardHeader>
            <CardContent>
              {itineraryData.destinations.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <MapPin className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No destinations added</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Add destinations from the panel on the right</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {itineraryData.destinations.map((destination, index) => (
                    <div key={destination.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <img
                              src={destination.image || "/placeholder.svg"}
                              alt={destination.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{destination.name}</h3>
                              <Badge variant="outline" className="ml-2">
                                {destination.type}
                              </Badge>
                              <Badge variant="outline" className="ml-2">
                                Day {index + 1}
                              </Badge>
                            </div>
                            <Textarea
                              placeholder={`Notes about your visit to ${destination.name}...`}
                              className="mt-2 h-20 resize-none"
                              value={destination.notes}
                              onChange={(e) => updateDestinationNotes(destination.id, e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDestination(destination.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button className="flex-1" onClick={handleSaveItinerary} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Itinerary
                </>
              )}
            </Button>
            <Button variant="outline" className="flex-1" disabled={isLoading}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Destinations</CardTitle>
              <CardDescription>Search and add destinations to your itinerary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search destinations..." className="pl-8" />
              </div>

              <Tabs defaultValue="popular">
                <TabsList className="w-full">
                  <TabsTrigger value="popular" className="flex-1">
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="historical" className="flex-1">
                    Historical
                  </TabsTrigger>
                  <TabsTrigger value="nature" className="flex-1">
                    Nature
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="popular" className="mt-4 space-y-4">
                  {popularDestinations.map((destination) => (
                    <div
                      key={destination.id}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-md">
                          <img
                            src={destination.image || "/placeholder.svg"}
                            alt={destination.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{destination.name}</h4>
                          <p className="text-xs text-muted-foreground">{destination.type}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => addDestination(destination)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="historical" className="mt-4 space-y-4">
                  {popularDestinations
                    .filter((d) => d.type === "Historical")
                    .map((destination) => (
                      <div
                        key={destination.id}
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <img
                              src={destination.image || "/placeholder.svg"}
                              alt={destination.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{destination.name}</h4>
                            <p className="text-xs text-muted-foreground">{destination.type}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => addDestination(destination)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="nature" className="mt-4 space-y-4">
                  {popularDestinations
                    .filter((d) => d.type === "Natural Wonder" || d.type === "National Park")
                    .map((destination) => (
                      <div
                        key={destination.id}
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <img
                              src={destination.image || "/placeholder.svg"}
                              alt={destination.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{destination.name}</h4>
                            <p className="text-xs text-muted-foreground">{destination.type}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => addDestination(destination)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itinerary Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Duration:</span>
                  <span className="ml-2 text-sm">
                    {itineraryData.dateRange.from && itineraryData.dateRange.to
                      ? `${Math.ceil(
                          (itineraryData.dateRange.to.getTime() - itineraryData.dateRange.from.getTime()) /
                            (1000 * 60 * 60 * 24),
                        )} days`
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Destinations:</span>
                  <span className="ml-2 text-sm">{itineraryData.destinations.length} selected</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Group Size:</span>
                  <span className="ml-2 text-sm">{itineraryData.groupSize} people</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Best Time to Visit:</span>
                  <span className="ml-2 text-sm">October - March</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Recommended Add-ons</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border p-2 hover:bg-muted cursor-pointer">
                    <span className="text-sm">Private Guide Service</span>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-2 hover:bg-muted cursor-pointer">
                    <span className="text-sm">Airport Transfers</span>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-2 hover:bg-muted cursor-pointer">
                    <span className="text-sm">Travel Insurance</span>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

