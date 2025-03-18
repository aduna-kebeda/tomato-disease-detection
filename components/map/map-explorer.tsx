"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Navigation,
  Download,
  Layers,
  Plus,
  Minus,
  Coffee,
  Utensils,
  Hotel,
  Landmark,
  Mountain,
  Camera,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Mock data for popular destinations
const popularDestinations = [
  { id: 1, name: "Lalibela", type: "Historical", lat: 12.0319, lng: 39.0453 },
  { id: 2, name: "Danakil Depression", type: "Natural Wonder", lat: 14.2417, lng: 40.3025 },
  { id: 3, name: "Addis Ababa", type: "City", lat: 9.0222, lng: 38.7468 },
  { id: 4, name: "Simien Mountains", type: "National Park", lat: 13.25, lng: 38.4167 },
  { id: 5, name: "Axum", type: "Historical", lat: 14.1213, lng: 38.7468 },
  { id: 6, name: "Gondar", type: "Historical", lat: 12.603, lng: 37.4521 },
]

// Mock data for nearby attractions
const nearbyAttractions = [
  {
    id: 1,
    name: "Yod Abyssinia Cultural Restaurant",
    type: "Restaurant",
    distance: "0.5 km",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "National Museum of Ethiopia",
    type: "Museum",
    distance: "1.2 km",
    icon: <Landmark className="h-4 w-4" />,
  },
  { id: 3, name: "Sheraton Addis", type: "Hotel", distance: "1.8 km", icon: <Hotel className="h-4 w-4" /> },
  { id: 4, name: "Tomoca Coffee", type: "Cafe", distance: "0.7 km", icon: <Coffee className="h-4 w-4" /> },
  { id: 5, name: "Entoto Natural Park", type: "Park", distance: "5.3 km", icon: <Mountain className="h-4 w-4" /> },
  { id: 6, name: "Meskel Square", type: "Landmark", distance: "2.1 km", icon: <MapPin className="h-4 w-4" /> },
]

export default function MapExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [zoom, setZoom] = useState([10])

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="search">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="directions">Directions</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="mt-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Popular Destinations</h3>
                  <div className="space-y-2">
                    {popularDestinations.map((destination) => (
                      <div
                        key={destination.id}
                        className="flex items-center justify-between rounded-md border p-2 hover:bg-muted cursor-pointer"
                      >
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-primary" />
                          <span>{destination.name}</span>
                        </div>
                        <Badge variant="outline">{destination.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="directions" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Starting point..."
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="relative">
                    <Navigation className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Destination..."
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button className="w-full">Get Directions</Button>
                </div>

                <div className="rounded-md border p-3">
                  <h3 className="font-medium mb-2">Route Information</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">245 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">4h 30m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Road Type:</span>
                      <span className="font-medium">Highway/Rural</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Route
                </Button>
              </TabsContent>

              <TabsContent value="nearby" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Nearby Attractions</h3>
                  <div className="space-y-2">
                    {nearbyAttractions.map((attraction) => (
                      <div
                        key={attraction.id}
                        className="flex items-center justify-between rounded-md border p-2 hover:bg-muted cursor-pointer"
                      >
                        <div className="flex items-center">
                          {attraction.icon}
                          <span className="ml-2">{attraction.name}</span>
                        </div>
                        <Badge variant="outline">{attraction.distance}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Filter By</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer bg-primary text-primary-foreground">
                      <Hotel className="mr-1 h-3 w-3" />
                      Hotels
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      <Utensils className="mr-1 h-3 w-3" />
                      Restaurants
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      <Landmark className="mr-1 h-3 w-3" />
                      Attractions
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      <Coffee className="mr-1 h-3 w-3" />
                      Cafes
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      <Camera className="mr-1 h-3 w-3" />
                      Photo Spots
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Distance</Label>
                    <span className="text-sm font-medium">5 km</span>
                  </div>
                  <Slider defaultValue={[5]} max={20} step={1} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium">Map Settings</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="satellite">Satellite View</Label>
                <Switch id="satellite" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="traffic">Traffic Information</Label>
                <Switch id="traffic" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="terrain">Terrain Features</Label>
                <Switch id="terrain" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Map Style</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex aspect-square flex-col items-center justify-center rounded-md border p-2 hover:bg-muted cursor-pointer">
                  <Layers className="h-6 w-6 mb-1" />
                  <span className="text-xs">Standard</span>
                </div>
                <div className="flex aspect-square flex-col items-center justify-center rounded-md border p-2 hover:bg-muted cursor-pointer">
                  <Layers className="h-6 w-6 mb-1" />
                  <span className="text-xs">Satellite</span>
                </div>
                <div className="flex aspect-square flex-col items-center justify-center rounded-md border p-2 hover:bg-muted cursor-pointer">
                  <Layers className="h-6 w-6 mb-1" />
                  <span className="text-xs">Terrain</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Map
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <div className="lg:col-span-3">
        <Card className="h-[700px] overflow-hidden">
          <CardContent className="p-0 h-full relative">
            {!mapLoaded ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading map...</p>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://i.imgur.com/JgBnYAW.jpg')",
                    backgroundSize: "cover",
                  }}
                >
                  {/* Map markers would be rendered here in a real implementation */}
                </div>

                {/* Map Controls */}
                <div className="absolute right-4 top-4 flex flex-col space-y-2">
                  <Button variant="secondary" size="icon" className="rounded-full shadow-md">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-full shadow-md">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Map Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                  © Ethiopia Travel Platform | Map data © OpenStreetMap
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

